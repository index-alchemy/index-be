import algoliasearch from 'algoliasearch';
import Pitch from '../models/Pitch.js';
import User from '../models/User.js';
import Sprint from '../models/Sprint.js';
import parseCohort from '../utils/parseCohorts.js';

const { ALGOLIA_APP_ID, ALGOLIA_ADMIN_API_KEY, CLIENT_URL } = process.env;

const algoliaIndex = algoliasearch(
  ALGOLIA_APP_ID, 
  ALGOLIA_ADMIN_API_KEY
).initIndex('pitches');

const dateOptions = { year: 'numeric', month: 'long', day: 'numeric' };

export default class PitchService {

  static create = async pitch => {
    // make sure pitch name isn't already used in this sprint
    const existingPitches = await PitchService.getSprintPitches(pitch.sprintId)
      .then(pitches => pitches.map(p => p.pitch));
    ;

    if (!existingPitches.includes(pitch.pitch)) {
      // only index pitches if not on localhost
      if (!CLIENT_URL.includes('localhost')) {
        const indexedPitch = await PitchService.makeIndexedPitch(pitch);
        algoliaIndex.saveObject(indexedPitch);
      }
      return await Pitch.create(pitch);
    }
    else throw new Error('Pitch name already exists.');
  };

  static getAll = async () =>
    await Pitch.getAll();

  static getById = async id =>
    await Pitch.getById(id);

  static getUserPitches = async userId =>
    await Pitch.getByUserId(userId);

  static getSprintPitches = async sprintId =>
    await Pitch.getBySprintId(sprintId);

  static update = async (id, pitch) =>
    await Pitch.update(id, pitch);

  static delete = async id => {
    if (!CLIENT_URL.includes('localhost')) await algoliaIndex.deleteObject(id);
    return await Pitch.delete(id);
  };
  
  static makeIndexedPitch = async pitch => {
    const user = await User.findBy(pitch.userId);
    const sprint = await Sprint.findSprintById(pitch.sprintId);
    const cohort = parseCohort(sprint.cohort);
    const team = sprint.result 
      ? (sprint.result[pitch.id] || sprint.result[pitch.name])
      : []
    ;

    return {
      objectId: pitch.id,
      title: pitch.pitch,
      description: pitch.description,
      suggestedBy: user?.username,
      dateSuggested: pitch.userId
        && new Date(pitch.createdAt).toLocaleDateString(dateOptions),
      team,
      cohort,
      projectURL: pitch.completed
    };
  }
  
  static indexPitches = async () => {
    const users = await User.findAll();
    const sprints = await Sprint.findAllSprints();
    let pitches = await PitchService.getAll();

    pitches = pitches.map(pitch => {

      const sprint = sprints.find(sprint => sprint.id === pitch.sprintId);
      const team = sprint.result 
        ? (sprint.result[pitch.id] || sprint.result[pitch.name])
        : []
      ;
      const cohort = parseCohort(sprint.cohort);
      
      return {
        objectID: pitch.id,
        title: pitch.pitch,
        description: pitch.description,
        suggestedBy: pitch.userId 
          && users.find(user => user.id === pitch.userId).usernname,
        dateSuggested: pitch.userId
          && new Date(pitch.createdAt).toLocaleDateString(dateOptions),
        sprint: sprint.name,
        team,
        cohort,
        projectURL: pitch.completed
      };
    });

    await algoliaIndex.replaceAllObjects(pitches);
  }
}

// PitchService.indexPitches();

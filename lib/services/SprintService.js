import Sprint from '../models/Sprint.js';
import Pitch from '../models/Pitch.js';
import User from '../models/User.js';
import Preference from '../models/Preference.js';
import teamAlgorithm from '../utils/teams.js';

export default class SprintService {

  static getById = async id => {
    const sprint = await Sprint.findSprintById(id);
    const pitches = await Pitch.getBySprintId(id);
    const preferences = await Preference.findBy(id, 'sprint_id');

    return { ...sprint, pitches, preferences };
  };

  static getWithResult = async (id, G = null, recalculate = false) => {

    const sprint = await SprintService.getById(id);
    const result = sprint.result && !recalculate
      ? sprint.result
      : teamAlgorithm({
        description: sprint.name,
        pitches: sprint.pitches,
        preferences: sprint.preferences,
        G: ~~Math.max(2, G) || Math.min(~~(preferences.length / 4), pitches.length)
      })
    ;

    await Sprint.updateSprintById(id, { ...sprint, result });

    // lol I originally tried doing this with .reduce but the got into callback hell
    const formattedResult = {};
    for (let pitchId of Object.keys(result)) {
      const pitch = (await Pitch.getById(pitchId)).pitch;
      formattedResult[pitch] = [];
      const team = result[pitchId];

      for (let userId of team) {
        const user = (await User.findBy(userId)).name;
        formattedResult[pitch].push(user);
      }
    }
    // good old, reliable for loop

    return {
      ...sprint,
      result: formattedResult
    };
  };
}

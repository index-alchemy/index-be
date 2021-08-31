import Sprint from '../models/Sprint.js';
import Pitch from '../models/Pitch.js';
import Preference from '../models/Preference.js';
import teamAlgorithm from '../utils/teams.js';

export default class SprintService {
  calculateResult = (sprint, G = null) => {
    return teamAlgorithm({
      description: sprint.name,
      pitches: sprint.pitches,
      preferences: sprint.preferences,
      G: G || Math.min(~~(preferences.length / 4), pitches.length)
    });
  };

  static getById = async id => {
    const sprint = await Sprint.findSprintById(id);
    const pitches = await Pitch.getBySprintId(id);
    const preferences = await Preference.findBy(id, 'sprint_id');

    return { ...sprint, pitches, preferences };
  };

  static getWithResult = async id => {
    const sprint = await SprintService.getById(id);
    
    return { sprint, result: teamAlgorithm(sprint) };
  };
}

import Sprint from '../models/Sprint.js';
import Pitch from '../models/Pitch.js';
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

    return await Sprint.updateSprintById(id, { ...sprint, result });
  };
}

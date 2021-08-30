import teamAlgorithm from '../utils/teams.js';

export default class SprintService {
  calculateResults = (sprint, G = null) => {
    teamAlgorithm({
      description: sprint.name,
      pitches: sprint.pitches,
      preferences: sprint.preferences,
      G: G || Math.min(~~(preferences.length / 4), pitches.length)
    });
  };

  static getById = async id => {
    const sprint = await Sprint.findById(id);
    const pitches = await Pitch.getBySprintId(id);
    const preferences = await Preference.findBy(id, 'sprint_id');

    return { ...sprint, pitches, preferences };
  };

  static getWithResults = async id => {
    const sprint = await SprintService.getById(id);
    
    return { sprint, result: teamAlgorithm(sprint) };
  };
}

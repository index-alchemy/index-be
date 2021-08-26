import Pitch from '../models/Pitch.js';

export default class PitchService {
  static create = async pitch =>
    await Pitch.create(pitch);

  static getUserPreferences = async userId =>
    await Pitch.getAll(userId, 'userId', false);

  static getSprintPreferences = async sprintId =>
    await Pitch.getAll(sprintId, 'sprintId', false);

  static update = async (id, pitch) =>
    await Pitch.update(id, pitch);

  static delete = async id =>
    await Pitch.delete(id);
}


import Pitch from '../models/Pitch.js';

export default class PitchService {
  static create = async pitch =>
    await Pitch.create(pitch);

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

  static delete = async id =>
    await Pitch.delete(id);
}


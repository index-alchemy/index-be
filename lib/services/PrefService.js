import Preference from '../models/Preference.js';

export default class PrefService {
  static create = async preference =>
    await Preference.create(preference);

  static findAll = async () =>
    await Preference.findAll();

  static findById = async id =>
    await Preference.findById(id);

  static getSprintPreferences = async sprintId =>
    await Preference.findAll(sprintId, 'sprint_id', false)

  static getUserPreferences = async userId =>
    await Preference.findAll(userId, 'user_id', false)

  static update = async (id, preference) =>
    await Preference.update(preference, id)

  static delete = async id =>
    await Preference.delete(id)
}
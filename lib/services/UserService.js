import User from '../models/User.js';

export default class UserService {
  static async getAllUsers() {
    return await User.findAll();
  }

  // should have a static function to get a user along w all their comments and preferences
}
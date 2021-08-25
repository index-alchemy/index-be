import bcrypt from 'bcrypt';
import User from '../model/User.js';

export default class AuthService {
  static async create(user) {
    return await User.create({
      ...user,
      passwordHash: await bcrypt.hash(
        user.password, Number(process.env.SALT_ROUNDS))
    });
  }

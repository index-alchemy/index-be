import bcrypt from 'bcrypt';
import User from '../models/User.js';

export default class AuthService {
  static async create(user) {
    return await User.create({
      ...user,
      passwordHash: await bcrypt.hash(
        user.password, Number(process.env.SALT_ROUNDS))
    });
  }

  static async authorize(user) {
    const userData = await User.findBy(user.name, 'name');
    if (!user) throw new Error('Who???');

    const passwordsMatch = await bcrypt.compare(user.password, userData.passwordHash);
    if (!passwordsMatch) throw new Error('Denied entry');

    return user;
  }
}

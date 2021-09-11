import pool from '../utils/pool.js';
import jwt from 'jsonwebtoken';

export default class User {
  id;
  cohort;
  username;
  bio;
  avatar;
  github;
  createdAt;

  constructor(row) {
    this.id = row.id;
    this.cohort = row.cohort;
    this.username = row.username;
    this.bio = row.bio;
    this.avatar = row.avatar;
    this.github = row.github;
    this.createdAt = row.created_at;
  }

  static async create({ id, cohort, username, bio, avatar, github }) {
    const { rows } = await pool.query(`
      INSERT INTO users (id, cohort, username, bio, avatar, github)
      VALUES ($1, $2, $3, $4, $5, $6)
      RETURNING *;
    `, [id, cohort, username, bio, avatar, github]);

    return new User(rows[0]);
  }

  static async findBy(val, key = 'id') {
    const { rows } = await pool.query(`
      SELECT * FROM users WHERE ${key} = $1;
    `, [val]);

    return rows.length ? new User(rows[0]) : null;
  }

  static async findAll() {
    const { rows } = await pool.query(`
      SELECT * FROM users;
    `);

    return rows.map(row => new User(row));
  }

  authToken() {
    return jwt.sign(
      { ...this },
      process.env.APP_SECRET,
      { expiresIn: '24h' }
    );
  }
}
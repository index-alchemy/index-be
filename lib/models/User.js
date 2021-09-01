import pool from '../utils/pool.js';
import jwt from 'jsonwebtoken';

export default class User {
  id;
  name;
  email;
  cohort;
  passwordHash;
  isAdmin;
  createdAt;

  constructor(row) {
    this.id = row.id;
    this.name = row.name;
    this.email = row.email;
    this.cohort = row.cohort;
    this.passwordHash = row.password_hash;
    this.isAdmin = row.is_admin;
    this.createdAt = row.created_at;
  }

  static async create({ name, email, cohort, passwordHash, isAdmin}) {
    const { rows } = await pool.query(`
      INSERT INTO users (name, email, cohort, password_hash, is_admin)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING *;
    `, [name, email, cohort, passwordHash, isAdmin]);

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
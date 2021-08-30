import pool from '../utils/pool.js';

export default class Comment {
  id;
  userId;
  pitchId;
  comment;
  createdAt;

  constructor(row) {
    this.id = row.id;
    this.userId = row.user_id;
    this.pitchId = row.pitch_id;
    this.comment = row.comment;
    this.createdAt = row.created_at;
  }

  static async create({ userId, pitchId, comment }) {
    const { rows } = await pool.query(`
      INSERT INTO comments (user_id, pitch_id, comment)
      VALUES ($1, $2, $3)
      RETURNING *;
    `, [userId, pitchId, comment]);

    return new Comment(rows[0]);
  }

  static async findBy(val, key = 'id', one = true) {
    const { rows } = await pool.query(`
      SELECT * FROM comments
      WHERE ${key} = $1;
    `, [val]);

    if (!rows[0]) return one ? null : [];
    return one ? new Comment(rows[0]) : rows.map(row => new Comment(row));
  }

  static async findAll() {
    const { rows } = await pool.query(`
      SELECT * FROM comments;
    `);

    return rows.map(row => new Comment(row));
  }

  static async updateCommentBy({ comment }, val, key = 'id') {
    const { rows } = await pool.query(`
      UPDATE comments
      SET comment = $1
      WHERE ${key} = $2
      RETURNING *;
    `, [comment, val]);

    if (!rows[0]) return null;
    return new Comment(rows[0]);
  }

  static async deleteBy(val, key = 'id', one = true) {
    const { rows } = await pool.query(`
      DELETE FROM comments
      WHERE ${key} = $1
      RETURNING *;
    `, [val]);

    if (!rows[0]) return one ? null : [];
    return one ? new Comment(rows[0]) : rows.map(row => new Comment(row));
  }
};

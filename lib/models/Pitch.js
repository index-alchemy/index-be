import pool from '../utils/pool.js';

export default class Pitch {
  id;
  userId;
  sprintId;
  pitch;
  description;
  createdAt;

  constructor(row) {
    this.id = row.id;
    this.userId = row.user_id;
    this.sprintId = row.sprint_id;
    this.pitch = row.pitch;
    this.description = row.description;
    this.createdAt = row.created_at;
  }

  static async create({ userId, sprintId, pitch, description }) {
    const { rows } = await pool.query(`
    INSERT INTO pitches (user_id, sprint_id, pitch, description)
    VALUES ($1, $2, $3, $4)
    RETURNING *
    `, [userId, sprintId, pitch, description]);

    return new Pitch(rows[0]);
  }

  static async update(id, pitch, description) {
    const { rows } = await pool.query(`
    UPDATE pitches
    SET pitch = $1, description = $2
    WHERE id = $3
    RETURNING *
    `, [pitch, description, id]);

    return new Pitch(rows[0]);
  }

  static async delete(id) {
    const { rows } = await pool.query(`
    DELETE FROM pitches
    WHERE id = $1
    RETURNING *
    `, [id]);
    return new Pitch(rows[0]);
  }

  static async getAll() {
    const { rows } = await pool.query(`
    SELECT * FROM pitches
    `);

    return rows.map(row => new Pitch(row));
  }

  static async getByPitchId(pitchId) {
    const { rows } = await pool.query(`
    SELECT * FROM pitches
    WHERE sprint_id = $1
    `, [pitchId]);

    return rows.map(row => new Pitch(row));
  }
}
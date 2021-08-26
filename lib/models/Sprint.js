import pool from '../utils/pool.js'

export default class Sprint {
  id;
  name;
  cohort;
  result;
  createdAt

  constructor(row) {
    this.id = row.id;
    this.name = row.name;
    this.cohort = row.cohort;
    this.result = row.result;
    this.createdAt = row.created_at;
  }

  static async createSprint({ name, cohort, result }) {
    const { rows } = await pool.query(
      `INSERT INTO sprints (name, cohort, result)
        VALUES ($1, $2, $3)
        RETURNING *`, 
          [name, cohort, result]
    );
    return new Sprint(rows[0])
  }

  static async findSprintById(id) {
    const { rows } = await pool.query(
      `SELECT * 
        FROM sprints
        WHERE id = $1`,
          [id]
    );
    return new Sprint(rows[0]);
  }

  static async findAllSprints() {
    const { rows } = await pool.query(
      `SELECT *
        FROM sprints`
    );
    return rows.map(row => new Sprint(row));
  }

  static async updateSprintById(id, name, cohort, result) {
    const { rows } = await pool.query(
      `UPDATE sprints
        SET name = $1
            cohort = $2
            result = $3
        WHERE id = $4
        RETURNING id, name, cohort, result`,
         [name, cohort, result, id]
    );
    return new Sprint(rows[0]);
  }

  static async deleteSprintById(id) {
    const { rows } = await pool.query(
      `DELETE FROM sprints
        WHERE id = $1
        RETURNING *`,
          [id]
    );
    return new Sprint(rows[0]);
  }
}

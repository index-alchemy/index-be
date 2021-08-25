export default class Preference {
  id;
  userId;
  sprintId;
  preference;

  constructor(row) {
    this.id = row.id;
    this.userId = row.user_id;
    this.sprintId = row.sprint_id;
    this.preference = row.preference;
  }

  static async create({ userId, sprintId, preference }) {
    const { rows } = await pool.query(`
    INSERT INTO preferences (user_id, sprint_id, preference)
    VALUES ($1, $2, $3)
    RETURNING *;
    `, [userId, sprintId, preference]);

    return new Preference(rows[0]);
  }

  static async findAll() {
    const { rows } = await pool.query(`
    SELECT * FROM preferences
    `);

    return rows.map(row => new Preference(row));
  }

  static async findById(id) {
    const { rows } = await pool.query(`
    SELECT * FROM preferences where id = $1;
    `, [id]);

    return new Preference(rows[0]);
  }

  static async amend(id) {
    const { rows } = await pool.query(`
    UPDATE preferences SET preference = $1 WHERE id = $2;
    `, [id]);

    return new Preference(rows[0]);
  }

  static async delete(id) {
    const { rows } = await pool.query(`
    DELETE FROM preferences WHERE id = $1;
    `, [id]);

    return new Preference(rows[0]);
  }
}

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
}

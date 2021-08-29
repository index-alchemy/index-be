import sprints from './sprints';
import client from '../lib/utils/client.js';

run();

async function run() {

  try {
    await Promise.all(
      sprints.map(sprint => {
        return client.query(`
        INSERT INTO sprints (name, cohort)
        VALUES ($1, $2)
        RETURNING *;
        `, [sprint.name, sprint.cohort]);
      })
    );
  }
  catch (err) {
    console.log(err);
  }
  finally {
    client.end();
  }
}
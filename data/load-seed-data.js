import users from '../data/users.js'
import sprints from '../data/sprints.js';
import pitches from '../data/pitches.js';
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

    await Promise.all(
      pitches.map(pitch => {
        return client.query(`
        INSERT INTO pitches (sprint_id, pitch, description)
        VALUES ($1, $2, $3)
        RETURNING *;
        `,
          [pitch.sprint_id, pitch.pitch, pitch.description]);
      })
    );

    // await Promise.all(
    //   users.map(user => {
    //     return client.query(`
    //     INSERT INTO users (name, email, cohort, password_hash)
    //     VALUES ($1, $2, $3, $4)
    //     RETURNING *;
    //     `,
    //       [user.name, user.email, user.cohort, user.passwordHash]);
    //   })
    // );

    console.log('Seed data loaded');


  } catch (err) {
    console.log(err);
  }
  finally {
    client.end();
  }
}
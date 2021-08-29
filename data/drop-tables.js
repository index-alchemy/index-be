/* eslint-disable no-console */
import client from '../lib/utils/client.js';

run();

async function run() {
  try {
    await client.query(`
      DROP TABLE IF EXISTS sprints CASCADE;
      DROP TABLE IF EXISTS pitches CASCADE;
    `);

    console.log('drop tables complete');
  } catch (err) {
    console.log(err);
  } finally {
    client.end();
  }
}
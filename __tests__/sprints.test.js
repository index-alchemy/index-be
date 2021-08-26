import pool from '../lib/utils/pool.js';
import setup from '../data/setup.js';
import request from 'supertest';
import app from '../lib/app.js';
import Sprint from '../lib/models/Sprint.js'
import AuthService from '../lib/services/AuthService.js'

describe('sprints routes', () => {

  const agent = request.agent(app);
  let user;

  beforeEach(async() => {
    await setup(pool);

    user = (await agent
      .post('/api/v1/auth/signup')
      .send({
      name: 'clem',
      email: 'clem@clem.clem',
      password: 'password',
      cohort: 'march 2021'
    })).body;

    await agent
      .post('/api/v1/auth/login')
      .send({
        email: 'clem@clem.clem',
        password: 'password'
      });

    return user;
  });

  const sprint1 = {
    name: 'mid project',
    cohort: 'march 2021',
  };

  const sprint2 = {
    name: 'final project',
    cohort: 'july 2021',
  };

  const sprint3 = {
    name: 'final project',
    cohort: 'march 2021',
  };

  it('creates a sprint', async () => {
    const res = await agent
      .post('/api/v1/sprints')
      .send(sprint1)

    expect(res.body).toEqual({
      id: '1',
      name: 'mid project',
      cohort: 'march 2021',
      result: null,
      createdAt: expect.any(String)
    })
  });

  it('it gets all sprints', async () => {
    const one = await Sprint.createSprint(sprint1);
    const two = await Sprint.createSprint(sprint2);
    

    const res = await agent
      .get('/api/v1/sprints');
      console.log(res.body);

    expect(res.body).toEqual([
      { ...one, createdAt: expect.any(String) },
      { ...two, createdAt: expect.any(String) }
   ]);
  });
})


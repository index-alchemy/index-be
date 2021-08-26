import pool from '../lib/utils/pool.js';
import setup from '../data/setup.js';
import request from 'supertest';
import app from '../lib/app.js';

describe('auth routes', () => {

  const user = {
    name: 'test',
    email: 'test@test.com',
    cohort: 'Mar 21',
    password: 'test',
  };

  beforeEach(() => {
    return setup(pool);
  });

  test('Post a user to auth/signup', async () => {
    const res = await request(app)
      .post('/api/v1/auth/signup')
      .send(user);

    expect(res.body).toEqual({
      id: '1',
      name: user.name,
      email: user.email,
      cohort: user.cohort,
      passwordHash: expect.any(String),
      createdAt: expect.any(String),
    });
  });

  test('logs a user in via Post', async () => {

    await request(app)
      .post('/api/v1/auth/signup')
      .send(user);

    const res = await request(app)
      .post('/api/v1/auth/login')
      .send({
        email: user.email,
        password: user.password
      });

    expect(res.body).toEqual({
      id: '1',
      name: user.name,
      email: user.email,
      cohort: user.cohort,
      passwordHash: expect.any(String),
      createdAt: expect.any(String),
    });
  });
});

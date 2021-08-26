import pool from '../lib/utils/pool.js';
import setup from '../data/setup.js';
import request from 'supertest';
import app from '../lib/app.js';
import Preference from '../lib/models/Preference.js'
import AuthService from '../lib/services/AuthService.js'

describe('preferences routes', () => {

  const agent = request.agent(app);
  let user;

  beforeEach(async () => {
    await setup(pool);

    user = (await agent
      .post('/api/v1/auth/signup')
      .send({
        name: 'culi',
        email: 'culi@culi.culi',
        password: 'password',
        cohort: 'culi 2021'
      })).body;

    await agent
      .post('/api/v1/auth/login')
      .send({
        email: 'culi@culi.culi',
        password: 'password'
      });

    return user;
  });

  const preference1 = {
    id: '1',
    userId: '1',
    sprintId: '1',
    preference: []
  }

  const preference2 = {
    id: '2',
    userId: '1',
    sprintId: '2',
    preference: []
  }

  const preference3 = {
    id: '3',
    userId: '1',
    sprintId: '3',
    preference: []
  }



})
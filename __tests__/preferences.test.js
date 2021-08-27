import pool from '../lib/utils/pool.js';
import setup from '../data/setup.js';
import request from 'supertest';
import app from '../lib/app.js';
import Preference from '../lib/models/Preference.js'
import AuthService from '../lib/services/AuthService.js'

describe('preferences routes', () => {

  const agent = request.agent(app);
  let user;
  let sprint;

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

    sprint = (await agent
      .post(`/api/v1/sprints/`)
      .send({
        name: 'sprint 1',
        cohort: 'Mar 2021'
      })
    ).body;


    return user;
  });

  const preference1 = {
    id: '1',
    userId: '1',
    sprintId: '1',
    preference: ['1', '2', '3', '4']
  }

  it('creates a preference', async () => {
    const res = await agent
      .post('/api/v1/preferences')
      .send(preference1)

    expect(res.body).toEqual({
      id: '1',
      userId: '1',
      sprintId: '1',
      preference: ['1', '2', '3', '4']
    })
  })

  it('gets all preferences', async () => {
    await Preference.create(preference1);
    const res = await agent
      .get('/api/v1/preferences')

    expect(res.body).toEqual([preference1])
  })

  it('gets a preference by id', async () => {
    await Preference.create(preference1);
    const res = await agent
      .get(`/api/v1/preferences/${preference1.id}`)

    expect(res.body).toEqual(preference1)
  })

  it('updates a preference', async () => {
    await Preference.create(preference1);
    const res = await agent
      .put(`/api/v1/preferences/${preference1.id}`)
      .send({
        preference: ['1', '2', '4', '3']
      })

    expect(res.body).toEqual({
      id: '1',
      userId: '1',
      sprintId: '1',
      preference: ['1', '2', '4', '3']
    })
  })

  it('deletes a preference', async () => {
    await Preference.create(preference1);
    const res = await agent
      .delete(`/api/v1/preferences/${preference1.id}`)

    expect(res.body).toEqual({
      id: '1',
      userId: '1',
      sprintId: '1',
      preference: ['1', '2', '3', '4']
    })
  })



})
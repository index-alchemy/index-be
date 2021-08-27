import pool from '../lib/utils/pool.js';
import setup from '../data/setup.js';
import request from 'supertest';
import app from '../lib/app.js';
import AuthService from '../lib/services/AuthService.js';

describe('pitch routes', () => {

  const agent = request.agent(app);
  let user, sprint;

  beforeEach(async () => {
    await setup(pool);

    // create and log in a user
    user = await AuthService.create({
      name: 'test',
      password: 'test',
      email: 'email@test.com',
      cohort: 'Mar 2021'
    });

    await agent
      .post('/api/v1/auth/login')
      .send({
        email: 'email@test.com',
        password: 'test'
      })
    ;

    // create a sprint
    sprint = (await agent
      .post(`/api/v1/sprints/`)
      .send({
        name: 'sprint 1',
        cohort: 'Mar 2021'
      })
    ).body;

    return user;
  });

  // create a test that will create a pitch
  it('creates a pitch via POST to /api/v1/pitches/', async () => {
    const res = await agent
      .post('/api/v1/pitches')
      .send({
        userId: user.id,
        sprintId: sprint.id,
        pitch: 'this is a pitch',
        description: 'this is a description of a pitch'
      })
    ;
    
    expect(res.body).toEqual({
      id: '1',
      userId: user.id,
      sprintId: sprint.id,
      pitch: 'this is a pitch',
      description: 'this is a description of a pitch',
      createdAt: expect.any(String)
    });
  });

  it('gets all pitches via GET to /api/v1/pitches/', async () => {
    // post a couple of pitches
    const p1 = await agent
      .post('/api/v1/pitches')
      .send({
        userId: user.id,
        sprintId: sprint.id,
        pitch: 'bookbook',
        description: 'rcv for book clubs'
      })
    ;
    const p2 = await agent
      .post('/api/v1/pitches')
      .send({
        userId: user.id,
        sprintId: sprint.id,
        pitch: 'curbee',
        description: 'community free stuff alert system'
      })
    ;

    // get all pitches
    const res = await agent.get('/api/v1/pitches');

    // test
    expect(res.body).toEqual(expect.arrayContaining([
      {
        ...p1.body,
        id: '1',
        createdAt: expect.any(String)
      },
      {
        ...p2.body,
        id: '2',
        createdAt: expect.any(String)
      }
    ]));
  });

  it('get a pitch by id with GET to /api/v1/pitches/:id', async () => {
    // post a pitch
    const pitch = await agent
      .post('/api/v1/pitches')
      .send({
        userId: user.id,
        sprintId: sprint.id,
        pitch: 'bookbook',
        description: 'rcv for book clubs'
      })
    ;

    // get that pitch by its id
    const res = await agent.get(`/api/v1/pitches/${pitch.body.id}`);

    // test
    expect(res.body).toEqual({
      ...pitch.body,
      id: '1',
      createdAt: expect.any(String)
    });
  });

  it('update a pitch with PUT to /api/v1/pitches/:id', async () => {
    // post a pitch
    const pitch = await agent
      .post('/api/v1/pitches')
      .send({
        userId: user.id,
        sprintId: sprint.id,
        pitch: 'bookbook',
        description: 'rcv for book clubs'
      })
    ;

    // edit that pitch
    const description = 'it\'s a dating site now';
    const res = await agent
      .put(`/api/v1/pitches/${pitch.body.id}`)
      .send({ ...pitch.body, description })
    ;

    // test
    expect(res.body).toEqual({
      ...pitch.body,
      description
    });
  });

  it('delete a pitch with DELETE to /api/v1/pitches/:id', async () => {
    // post a pitch
    const pitch = await agent
      .post('/api/v1/pitches')
      .send({
        userId: user.id,
        sprintId: sprint.id,
        pitch: 'bookbook',
        description: 'rcv for book clubs'
      })
    ;

    // delete that pitch
    await agent.delete(`/api/v1/pitches/${pitch.body.id}`);

    // get all pitches 
    const res = await agent.get('/api/v1/pitches');

    // test to make sure it's an array that doesn't contain that og pitch
    expect(res.body).toEqual(expect.not.arrayContaining([pitch.body]));
  });
});

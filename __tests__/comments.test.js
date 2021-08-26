import pool from '../lib/utils/pool.js';
import setup from '../data/setup.js';
import request from 'supertest';
import app from '../lib/app.js';

describe('test /api/v1/comments routes', () => {
  const agent = request.agent(app);
  let user, sprint, pitch;

  beforeAll(() => setup(pool));

  beforeEach(async () => {
    // sign up a user
    await agent
      .post('/api/v1/auth/signup')
      .send({
        name: 'test',
        email: 'test@test.test',
        cohort: '2021-08mar',
        password: 'test'
      })
    ;

    // log in a user
    user = (await agent
      .post('/api/v1/auth/login')
      .send({ email: 'test@test.test', password: 'test' })
    ).body;

    // create a sprint
    sprint = (await agent
      .post('/api/v1/sprints')
      .send({
        name: 'test sprint',
        cohort: '2021-08mar',
        results: null,
      })
    ).body;
    
    // create a pitch
    pitch = (await agent
      .post('/api/v1/pitches')
      .send({
        userId: user.id,
        sprintId: sprint.id,
        pitch: 'test pitch'
      })
    ).body;

    return setup(pool);
  });

  afterAll(() => setup(pool));

  test.only('POST to /api/v1/comments/', async () => {
    const comment = (await agent
      .post('/api/v1/comments/')
      .send({
        userId: user.id,
        pitchId: pitch.id,
        comment: 'very cool idea. What if you used Elm?',
      })
    ).body;

    console.log(comment);

    expect(comment).toEqual({
      id: '1',
      userId: user.id,
      pitchId: pitch.id,
      comment: expect.any(String),
      createdAt: expect.any(String)
    });
  });

  test('GET to /api/v1/comments/user/:user_id and /api/v1/comments/pitch/:pitch_id', async () => {
    // post a comment on a pitch by a user
    await agent
      .post('/api/v1/comments')
      .send({
        userId: user.id,
        pitchId: pitch.id,
        comment: 'very cool idea. What if you used Elm?',
      })
    ;

    // get all comments from a user
    const commentsByUser = (await agent
      .get(`/api/v1/comments/user/${user.id}`)
    ).body;

    // get all comments from a pitch
    const commentsByPitch = (await agent
      .get(`/api/v1/comments/pitch/${pitch.id}`)
    ).body;

    // test
    expect(commentsByUser).toEqual([{
      id: '1',
      userId: user.id,
      pitchId: pitch.id,
      comment: expect.any(String),
      createdAt: expect.any(String)
    }]);

    expect(commentsByPitch).toEqual([{
      id: '1',
      userId: user.id,
      pitchId: pitch.id,
      comment: expect.any(String),
      createdAt: expect.any(String)
    }]);

  });

  test('DELETE to /api/v1/comments/:id', async () => {
    // post a comment 
    await agent
      .post('/api/v1/comments')
      .send({
        userId: user.id,
        pitchId: pitch.id,
        comment: 'very cool idea. What if you used Elm?',
      })
    ;

    // delete the comment
    const deleted = (await agent.delete(`/api/v1/comments/${pitch.id}`)).body;

    // get all comments on a pitch
    const comments = (await agent
      .get(`/api/v1/comments/pitch/${pitch.id}`)
    ).body;

    // test
    expect(deleted).toEqual({
      id: '1',
      userId: user.id,
      pitchId: pitch.id,
      comment: expect.any(String),
      createdAt: expect.any(String)
    });
    expect(comments).toEqual([]);
  });

});

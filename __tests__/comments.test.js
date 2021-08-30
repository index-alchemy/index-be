import pool from '../lib/utils/pool.js';
import setup from '../data/setup.js';
import request from 'supertest';
import app from '../lib/app.js';

describe('test /api/v1/comments routes', () => {
  const agent = request.agent(app);
  let user, sprint, pitch;

  beforeEach(async () => {
    setup(pool);

    // sign up a user
    await agent
      .post('/api/v1/users/auth/signup')
      .send({
        name: 'test',
        email: 'test@test.test',
        cohort: '2021-08mar',
        password: 'test'
      })
    ;

    // log in a user
    user = (await agent
      .post('/api/v1/users/auth/login')
      .send({ email: 'test@test.test', password: 'test' })
    ).body;

    // create a sprint
    sprint = (await agent
      .post('/api/v1/sprints')
      .send({
        name: 'test sprint',
        cohort: '2021-08mar'
      })
    ).body;

    // create a pitch
    pitch = (await agent
      .post('/api/v1/pitches')
      .send({
        userId: user.id,
        sprintId: sprint.id,
        pitch: 'curbee',
        description: 'communist free stuff alert system'
      })
    ).body;
  });

  test('POST to /api/v1/comments/', async () => {
    const comment = (await agent
      .post('/api/v1/comments/')
      .send({
        userId: user.id,
        pitchId: pitch.id,
        comment: 'very cool idea. What if you used Elm?',
      })
    ).body;

    expect(comment).toEqual({
      id: '1',
      userId: user.id,
      pitchId: pitch.id,
      comment: expect.any(String),
      createdAt: expect.any(String)
    });
  });

  test('GET to /api/v1/users/:id/comments and /api/v1/pitches/:id/comments', async () => {
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
      .get(`/api/v1/users/${user.id}/comments`)
    ).body;

    // get all comments from a pitch
    const commentsByPitch = (await agent
      .get(`/api/v1/pitches/${pitch.id}/comments`)
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

  test('PUT to /api/v1/comments/:id/', async () => {
    // post a comment 
    const comment = (await agent
      .post('/api/v1/comments')
      .send({
        userId: user.id,
        pitchId: pitch.id,
        comment: 'very cool idea. What if you used Elm?',
      })
    ).body;

    // update the comment
    const res = await agent
      .put(`/api/v1/comments/${comment.id}`)
      .send({ comment: 'EDIT: nvm, this sucks' })
    ;

    // test
    expect(res.body).toEqual({
      ...comment,
      comment: 'EDIT: nvm, this sucks'
    });
  });

  test('DELETE to /api/v1/comments/:id', async () => {
    // post a comment 
    const comment = (await agent
      .post('/api/v1/comments')
      .send({
        userId: user.id,
        pitchId: pitch.id,
        comment: 'very cool idea. What if you used Elm?',
      })
    ).body;

    // delete the comment
    const deleted = (await agent.delete(`/api/v1/comments/${comment.id}`)).body;

    // get all comments on a pitch
    const comments = (await agent
      .get(`/api/v1/pitches/${pitch.id}/comments`)
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

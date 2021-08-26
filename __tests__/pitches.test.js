// import pool from '../lib/utils/pool.js';
// import setup from '../data/setup.js';
// import request from 'supertest';
// import app from '../lib/app.js';
// import Pitch from '../lib/models/pitch.js';
// import AuthService from '../lib/services/AuthService.js';


// describe('pitch routes', () => {

//   const agent = request.agent(app);
//   let user;

//   beforeEach(async () => {
//     await setup(pool);

//     user = await AuthService.create({
//       name: 'test',
//       password: 'test',
//       email: 'email@test.com',
//       cohort: 'Mar 2021'
//     });

//     await agent
//       .post('/api/v1/auth/login')
//       .send({
//         email: 'email@test.com',
//         password: 'test'
//       });

//     return user;
//   });

//   const sprint = {
//     id: '1',
//     name: 'sprint 1',
//     cohort: 'Mar 2021',
//     results: ['a', 'b', 'c'],
//     createdAt: expect.any(String)
//   };

//   // create a test that will create a pitch
//   it('creates a pitch via POST', async () => {
//     const res = await Pitch.create({
//       userId: user.id,
//       sprintId: sprint.id,
//       pitch: 'this is a pitch',
//       description: 'this is a description of a pitch'
//     });
//     console.log(res);
//     expect(res.body).toEqual({
//       id: '1',
//       userId: user.id,
//       sprintId: sprint.id,
//       pitch: 'this is a pitch',
//       description: 'this is a description of a pitch'
//     });
//   });
// });

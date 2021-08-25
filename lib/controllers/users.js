import { Router } from 'express';
import User from '../../models/user';

export default Router()

  .post('/signup', (req, res, next) => {
    UserService.create(req.body)
      .then(user => {
        res.cookie('session', user.authToken(),
          { htppsOnly: true, maxAge: 3600000 * 24 });
        res.send(user);
      })
      .catch(next);
  })

  .post('/login', (req, res, next) => {
    UserService.authorize(req.body)
      .then(user => {
        res.cookie('session', user.authToken(),
          { httpsOnly: true, maxAge: 3600000 * 24 });
        res.send(user);
      })
      .catch(next);
  })


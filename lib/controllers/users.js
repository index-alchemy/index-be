import { Router } from 'express';
import AuthService from '../services/AuthService.js';

export default Router()
  .post('/signup', (req, res, next) => {
    AuthService.create(req.body)
      .then(user => {
        res.cookie('session', user.authToken(),
          { htppsOnly: true, maxAge: 3600000 * 24 });
        res.send(user);
      })
      .catch(next);
  })

  .post('/login', (req, res, next) => {
    AuthService.authorize(req.body)
      .then(user => {
        res.cookie('session', user.authToken(),
          { httpsOnly: true, maxAge: 3600000 * 24 });
        res.send(user);
      })
      .catch(next);
  })
  ;

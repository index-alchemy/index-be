import { Router } from 'express';
import ensureAuth from '../middleware/ensure-auth.js';
import AuthService from '../services/AuthService.js';
import CommentService from '../services/CommentService.js';
import PrefService from '../services/PrefService.js';

const DAY = 1000* 60 * 60 * 24;
const cookieOpts = { 
  httpsOnly: true, 
  maxAge: DAY, 
  sameSite: 'none', 
  secure: true 
};

export default Router()
  .post('/auth/signup', (req, res, next) => {
    AuthService.create(req.body)
      .then(user => {
        res.cookie('session', user.authToken(), cookieOpts);
        res.send(user);
      })
      .catch(next);
  })

  .post('/auth/login', (req, res, next) => {
    AuthService.authorize(req.body)
      .then(user => {
        res.cookie('session', user.authToken(), cookieOpts);
        res.send(user);
      })
      .catch(next);
  })

  .get('/auth/verify', ensureAuth, (req, res, next) => {
    res.send(req.user);
  })

  .get('/auth/logout', (req, res, next) => {
    res.clearCookie('session', cookieOpts).send();
  })

  .get('/', ensureAuth, (req, res, next) => {
    AuthService.getAllUsers()
      .then(users => res.send(users))
      .catch(next)
    ;
  })

  .get('/:id/comments', ensureAuth, (req, res, next) => {
    CommentService.getCommentsForUser(req.params.id)
      .then(comments => res.send(comments))
      .catch(next)
    ;
  })

  .get('/:id/preferences', ensureAuth, (req, res, next) => {
    PrefService.getUserPreferences(req.params.id)
      .then(preferences => res.send(preferences))
      .catch(next);
  })
;

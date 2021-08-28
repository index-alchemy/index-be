import { Router } from 'express';
import ensureAuth from '../middleware/ensure-auth.js';
import AuthService from '../services/AuthService.js';
import CommentService from '../services/CommentService.js';
import PrefService from '../services/PrefService.js';

export default Router()
  .post('/auth/signup', (req, res, next) => {
    AuthService.create(req.body)
      .then(user => {
        res.cookie('session', user.authToken(),
          { htppsOnly: true, maxAge: 3600000 * 24 });
        res.send(user);
      })
      .catch(next);
  })

  .post('/auth/login', (req, res, next) => {
    AuthService.authorize(req.body)
      .then(user => {
        res.cookie('session', user.authToken(),
          { httpsOnly: true, maxAge: 3600000 * 24 });
        res.send(user);
      })
      .catch(next);
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

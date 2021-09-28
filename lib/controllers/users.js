import { Router } from 'express';
import ensureAuth from '../middleware/ensure-auth.js';
import UserService from '../services/UserService.js';
import CommentService from '../services/CommentService.js';
import PrefService from '../services/PrefService.js';

export default Router()
  .get('/', ensureAuth, (req, res, next) => {
    UserService.getAllUsers()
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

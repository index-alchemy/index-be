import { Router } from 'express';
import ensureAuth from '../middleware/ensure-auth.js';
import CommentService from '../services/CommentService.js';

export default Router()
  .post('/', ensureAuth, (req, res, next) => {
    CommentService.create(req.body)
      .then(comment => res.send(comment))
      .catch(next);
    ;
  })

  // maybe this route would better fit under a /users/ route?
  .get('/user/:user_id/', ensureAuth, (req, res, next) => {
    CommentService.getCommentsForUser(req.params.user_id)
      .then(comments => res.send(comments))
      .catch(next)
    ;
  })

  // maybe this route would better fit under a /pitches/ route?
  .get('/pitch/:pitch_id/', ensureAuth, (req, res, next) => {
    CommentService.getCommentsForPitch(req.params.pitch_id)
      .then(comments => res.send(comments))
      .catch(next)
    ;
  })

  .put('/:id/', ensureAuth, (req, res, next) => {
    CommentService.update(req.params.id, req.body)
      .then(comment => res.send(comment))
      .catch(next)
    ;
  })

  .delete('/:id/', ensureAuth, (req, res, next) => {
    CommentService.delete(req.params.id)
      .then(comment => res.send(comment))
      .catch(next)
    ;
  })
;

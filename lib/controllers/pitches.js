import { Router } from 'express';
import ensureAuth from '../middleware/ensure-auth.js'
import CommentService from '../services/CommentService.js';
import PitchService from '../services/PitchService.js';

export default Router()

  .post('/', async (req, res, next) => {
    try {
      const pitch = await PitchService.create(req.body);
      res.send(pitch);
    } catch (err) {
      next(err);
    }
  })

  .get('/', async (req, res, next) => {
    try {
      const pitch = await PitchService.getAll();
      res.send(pitch);
    } catch (err) {
      next(err);
    }
  })

  .get('/:id', async (req, res, next) => {
    try {
      const pitch = await PitchService.getById(req.params.id);
      res.send(pitch);
    } catch (err) {
      next(err);
    }
  })

  .get('/:id/comments', ensureAuth, (req, res, next) => {
    CommentService.getCommentsForPitch(req.params.id)
      .then(comments => res.send(comments))
      .catch(next)
    ;
  })

  .put('/:id', async (req, res, next) => {
    try {
      const pitch = await PitchService.update(req.params.id, req.body);
      res.send(pitch);
    } catch (err) {
      next(err);
    }
  })

  .delete('/:id', async (req, res, next) => {
    try {
      const pitch = await PitchService.delete(req.params.id);
      res.send(pitch);
    } catch (err) {
      next(err);
    }
  });


import { Router } from 'express';
import Pitch from '../models/pitch';

export default Router()

  .post('/', async (req, res, next) => {
    try {
      const pitch = await Pitch.create(req.body);
      res.send(pitch);
    } catch (err) {
      next(err);
    }
  })

  .get('/', async (req, res, next) => {
    try {
      const pitch = await Pitch.getAll();
      res.send(pitch);
    } catch (err) {
      next(err);
    }
  })

  .get('/:id', async (req, res, next) => {
    try {
      const pitch = await Pitch.getByPitchId(req.params.id);
      res.send(pitch);
    } catch (err) {
      next(err);
    }
  })

  .put('/:id', async (req, res, next) => {
    try {
      const pitch = await Pitch.update(req.params.id, req.body);
      res.send(pitch);
    } catch (err) {
      next(err);
    }
  })

  .delete('/:id', async (req, res, next) => {
    try {
      const pitch = await Pitch.remove(req.params.id);
      res.send(pitch);
    } catch (err) {
      next(err);
    }
  });


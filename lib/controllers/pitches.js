import { Router } from 'express';
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

  .get('/sprint/:sprint_id', async (req, res, next) => {
    try {
      const pitches = await PitchService.getSprintPitches(req.params.sprint_id);
      res.send(pitches);
    } catch (err) {
      next(err);
    }
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


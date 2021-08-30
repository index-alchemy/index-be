import { Router } from 'express';
import ensureAuth from '../middleware/ensure-auth.js';
import Sprint from '../models/Sprint.js';
import PitchService from '../services/PitchService.js';
import PrefService from '../services/PrefService.js';

export default Router()
  .post('/', ensureAuth, async (req, res) => {
    try {
      const sprint = await Sprint.createSprint(req.body);
      res.send(sprint);
    } catch (err) {
      res.status(500).send({ error: err.message });
    }
  })

  .get('/', ensureAuth, async (req, res) => {
    try {
      const sprint = await Sprint.findAllSprints();
      res.send(sprint);
    } catch (err) {
      res.status(500).send({ error: err.message });
    }
  })

  .get('/:id', ensureAuth, async (req, res) => {
    try {
      const sprint = await Sprint.findSprintById(req.params.id);
      res.send(sprint);
    } catch (err) {
      res.status(500).send({ error: err.message });
    }
  })

  .get('/:id/pitches', ensureAuth, (req, res, next) => {
    PitchService.getSprintPitches(req.params.id)
      .then(pitches => res.send(pitches))
      .catch(next)
    ;
  })

  .get('/:id/preferences', ensureAuth, (req, res, next) => {
    PrefService.getSprintPreferences(req.params.sprint_id)
      .then(preferences => res.send(preferences))
      .catch(next);
    ;
  })

  .put('/:id', ensureAuth, async (req, res) => {
    try {
      const sprint = await Sprint.updateSprintById(req.params.id, req.body);
      res.send(sprint);
    } catch (err) {
      res.status(500).send({ error: err.message });
    }
  })

  .delete('/:id', ensureAuth, async (req, res) => {
    try { 
      await Sprint.deleteSprintById(req.params.id);
      res.send({ status: 'success', message: 'delete success' });
    } catch (err) {
      res.status(500).send({ error: err.message });
    }
  });
import { Router } from 'express';
import ensureAuth from '../middleware/ensure-auth.js';
import Sprint from '../models/Sprint.js';

export default Router()
  .post('/', ensureAuth, async (req, res) => {
    try {
      const sprint = await Sprint.createSprint(req.body);
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

  .get('/', ensureAuth, async (req, res) => {
    try {
      const sprint = await Sprint.findAllSprints();
      res.send(sprint);
    } catch (err) {
      res.status(500).send({ error: err.message });
    }
  })  

  .put('/:id', ensureAuth, async (req, res) => {
    try {
      const sprint = await Sprint.updateSprintById(req.params.id, req.body.name, req.body.cohort, req.body.result);
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
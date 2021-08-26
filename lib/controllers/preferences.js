import { Router } from 'express';
import ensureAuth from '../middleware/ensure-auth.js';
import PrefService from '../services/PrefService.js';

export default Router()
  .post('/', ensureAuth, (req, res, next) => {
    PrefService.create(req.body)
      .then(preference => res.send(preference))
      .catch(next);
  })

  .get('/user/:user_id', ensureAuth, (req, res, next) => {
    PrefService.getUserPreferences(req.params.user_id)
      .then(preferences => res.send(preferences))
      .catch(next);
  })

  .get('/sprint/:sprint_id', ensureAuth, (req, res, next) => {
    PrefService.getSprintPreferences(req.params.sprint_id)
      .then(preferences => res.send(preferences))
      .catch(next);
  })

  .put('/:id/', ensureAuth, (req, res, next) => {
    PrefService.update(req.params.id, req.body)
      .then(preference => res.send(preference))
      .catch(next);
  })

  .delete('/:id/', ensureAuth, (req, res, next) => {
    PrefService.delete(req.params.id)
      .then(preference => res.send(preference))
      .catch(next);
  })
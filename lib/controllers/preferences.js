import { Router } from 'express';
import ensureAuth from '../middleware/ensure-auth.js';
import PrefService from '../services/PrefService.js';

export default Router()
  .post('/', ensureAuth, (req, res, next) => {
    PrefService.create(req.body)
      .then(preference => res.send(preference))
      .catch(next);
  })

  .get('/', ensureAuth, (req, res, next) => {
    PrefService.findAll()
      .then(preferences => res.send(preferences))
      .catch(next);
  })

  .get('/:id', ensureAuth, (req, res, next) => {
    PrefService.findById(req.params.id)
      .then(preference => res.send(preference))
      .catch(next);
  })

  .put('/:id', ensureAuth, (req, res, next) => {
    PrefService.update(req.params.id, req.body)
      .then(preference => res.send(preference))
      .catch(next);
  })

  .delete('/:id', ensureAuth, (req, res, next) => {
    PrefService.delete(req.params.id)
      .then(preference => res.send(preference))
      .catch(next);
  })
;

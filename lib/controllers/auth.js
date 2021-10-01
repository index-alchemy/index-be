import { Router } from 'express';
import ensureAuth from '../middleware/ensure-auth.js';
import AuthService from '../services/AuthService.js';

const { CLIENT_URL } = process.env;
const LOUD = process.env.LOUD === 'true';

const DAY = 1000* 60 * 60 * 24;
const cookieOpts = { 
  httpsOnly: true, 
  maxAge: DAY, 
  ... (CLIENT_URL.includes('localhost')
    ? {}
    : {
      sameSite: 'none', 
      secure: true 
    }
  )
};

export default Router()
  .get('/github', (req, res, next) => {
    const redirect = req.query.redirect || CLIENT_URL;
    AuthService.githubAuth(req.query)
      .then(user => {
        res.cookie('session', user.authToken(), cookieOpts);
        res.redirect(`${redirect}`);
      })
      .catch(next)
    ;
  })

  .get('/verify', ensureAuth, (req, res, next) => {
    if (LOUD) console.log('auth.js: verifying user', req.user);
    res.send(req.user);
  })

  .get('/logout', (req, res, next) => {
    res.clearCookie('session');
    res.redirect(CLIENT_URL);
  })
;
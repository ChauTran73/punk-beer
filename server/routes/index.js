const router = require('express').Router();
const axios = require('axios');
const { ensureLoggedIn } = require('connect-ensure-login');
const { passport } = require('../../server/passport-config');
const { userController } = require('../controllers');

router.get('/favorites', ensureLoggedIn('/login'), userController.getUser, (req, res) => {
  let { favorites, favoritesData } = req.session;
  res.status(200).json({favorites, favoritesData});
});

// Perform the login
router.get(
  '/login',
  passport.authenticate('auth0', {
    clientID: process.env.AUTH0_CLIENT_ID,
    domain: process.env.AUTH0_CLIENT_ID,
    redirectUri: process.env.CALLBACK_URL,
    audience: process.env.AUTH0_AUDIENCE,
    responseType: 'code',
    scope: process.env.AUTH0_SCOPE
  }),
  function(req, res) {
    res.redirect('/favorites/');
  }
);

// Perform session logout and redirect to homepage
router.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/');
});

router.get(
  '/callback',
  passport.authenticate('auth0', {
    failureRedirect: '/'
  }),
  function(req, res) {
    res.redirect(req.session.returnTo || '/user');
  }
);

router.get('/', (req, res) => {
  //placeholder
  res.status(200).json({status: 'ok', code: 200});
})

module.exports = router;
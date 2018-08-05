const router = require('express').Router();
const { ensureLoggedIn } = require('connect-ensure-login');

const { passport } = require('../../server/passport-config');

router.get('/', ensureLoggedIn('/login'), (req, res, next) => {
  console.log(req.session.passport)
  if(req.session.page_views){
    req.session.page_views++;
    res.send("You visited this page " + req.session.page_views + " times");
  } else {
      req.session.page_views = 1;
      res.send("Welcome to this page for the first time!");
  }
})

// Perform the login
router.get(
  '/login',
  passport.authenticate('auth0', {
    clientID: process.env.AUTH0_CLIENT_ID,
    domain: 'sfallmann.auth0.com',
    redirectUri: process.env.CALLBACK_URL,
    audience: 'https://sfallmann.auth0.com/userinfo',
    responseType: 'code',
    scope: 'openid profile'
  }),
  function(req, res) {
    res.redirect('/');
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

module.exports = router;
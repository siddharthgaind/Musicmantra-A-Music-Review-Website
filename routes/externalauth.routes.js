const express = require('express');
const router = express.Router();
const auth = require('../controllers/auth');
const cookieParser = require('cookie-parser'), cookieSession = require('cookie-session');
const passport = require('passport');
const externalauth = require('../controllers/externalauth.controller');

router.use(cookieSession({
    name: 'session',
    keys: ['123']
}));
auth(passport);
router.use(cookieParser());
router.use(passport.initialize());
router.get('/', externalauth.sessionToken);

router.get('/auth/google', passport.authenticate('google', {
    scope: [
       'https://www.googleapis.com/auth/userinfo.profile',
       'https://www.googleapis.com/auth/userinfo.email'
  ]
    })
  )


  router.get('/auth/google/callback', passport.authenticate('google', {
    failureRedirect: '/api'
        }),externalauth.externalAuth);

module.exports = router;

const express = require('express');
const router = express.Router();
const auth = require('../auth');
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
    scope: ['https://www.googleapis.com/auth/userinfo.profile']
}));
router.get('/auth/google/callback', passport.authenticate('google', {
    failureRedirect: '/user/'
}), externalauth.googleAuthenticate);

module.exports = (passport) => {
    passport.serializeUser((user, done) => {
        done(null, user);
    });
    passport.deserializeUser((user, done) => {
        done(null, user);
    });
    passport.use(new GoogleStrategy({
        clientID: '9554930153-e3sf6che2s48pc45ipia7t3fhmjrhfbq.apps.googleusercontent.com',
        clientSecret: 'vpfc6xbB95jLt_h04dReXCm9',
        callbackURL: 'http://localhost:5555/auth/google/callback'
    },
        (token, refreshToken, profile, done) => {
            return done(null, {
                profile: profile,
                token: token
            });
        }));
};

module.exports = router;
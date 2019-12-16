//use passport for external auth
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
var email;
module.exports = (passport) => {
    passport.serializeUser((user, done) => {
        done(null, user);
    });
    passport.deserializeUser((user, done) => {
        done(null, user);
    });
    passport.use(new GoogleStrategy({
        clientID: '367248324832-mn1d0uup89g20pcdfv8rvkdab89akg72.apps.googleusercontent.com',
        clientSecret: '8hVXawj4FHfprqUfOF_6d_Ap',
        callbackURL: 'http://localhost:5555/api/auth/google/callback'
    },
        (token, refreshToken, profile, done) => {
            console.log(profile.emails[0].value);
            email = profile.emails[0].value
            return done(null, { profile: profile, token: token });
        }
    ));
};

function favorite() {
    console.log(email)
    return email;
}
module.exports.favorite = favorite;
require('dotenv').config();

const User = require('../app/models/user'),
    LocalStrategy = require('passport-local').Strategy,
    ExtractJwt = require('passport-jwt').ExtractJwt,
    JwtStrategy = require('passport-jwt').Strategy,
    passport = require('passport');

module.exports.localStrategy = new LocalStrategy({usernameField: 'email'}, (username, password, done) => {

    User.findOne({
        email: username
    }, (err, user) => {

        if(err) {
            return done(err);
        }

        if(!user) {
            return done(null, false, {errorMsg: 'Il semblerait que la combinaison ne soit pas correcte.'});
        }

        user.comparePassword(password, (err, isMatch) => {

            if(err) {
                return done(err);
            }

            if(!isMatch) {
                return done(null, false, {errorMsg: 'Il semblerait que la combinaison ne soit pas correcte.'});
            }

            return done(null, user);

        });

    });

});

const jwtOptions = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme('JWT'),
    secretOrKey: process.env.SECRET_PASS
};

module.exports.jwtStrategy = new JwtStrategy(jwtOptions, (payload, done) => {

    User.findById(payload._id, (err, user) => {

        if(err) {
            return done(err, false);
        }

        if(!user) {
            return done(null, false);
        }

        return done(null, user);

    });

});

module.exports.checkIsAuth = passport.authenticate('jwt', {session: false});

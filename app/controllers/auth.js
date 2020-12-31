require('dotenv').config();

const User = require('../models/user'),
    passport = require('passport'),
    jwt = require('jsonwebtoken');

function generateToken(user) {
    return jwt.sign(user, process.env.SECRET_PASS, {
        expiresIn: '1y'
    });
}

/**
 * Method used for try to logged the user
 * @param req
 * @param res
 * @param next
 */
exports.login = (req, res, next) => {

    passport.authenticate('local', {session: false}, (err, user, info) => {

        if(err) {
            return res.status(400).json(err);
        }

        if(!user) {
            return res.status(422).json(info);
        }

        res.status(200).json({
            user: user,
            token: 'JWT ' + generateToken({
                _id: user._id,
                email: user.email,
                password: user.password
            })
        });

    })(req, res, next);

};

/**
 * Method used for register a new user
 * @param req
 * @param res
 * @param next
 */
exports.register = (req, res, next) => {

    const user = new User(req.body);

    user.save((err, user) => {

        if(err) {
            return res.status(400).json(err);
        }

        res.status(200).json({
            user: user,
            token: 'JWT ' + generateToken({
                _id: user._id,
                email: user.email,
                password: user.password
            })
        });

    });

};

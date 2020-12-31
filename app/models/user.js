const mongoose = require('mongoose')
    bcrypt = require('bcrypt');

const UserSchema = new mongoose.Schema({

    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true,
    }

}, {
    timestamps: true
});

UserSchema.pre('save', function(next) {

    const SALT_FACTOR = 5;

    if(!this.isModified('password')) {
        return next();
    }

    bcrypt.genSalt(SALT_FACTOR, (err, salt) => {

        if(err) {
            return next(err);
        }

        bcrypt.hash(this.password, salt, (err, hashedPassword) => {

            if(err) {
                return next(err);
            }

            this.password = hashedPassword;
            return next();

        });

    });

});

UserSchema.methods.comparePassword = function(passwordAttempt, cb) {

    bcrypt.compare(passwordAttempt, this.password, (err, isMatch) => {

        if(err) {
            return cb(err);
        }

        return cb(null, isMatch);

    });

};

module.exports = mongoose.model('User', UserSchema, 'users');

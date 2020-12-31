const express = require('express'),
    authRoutes = express.Router(),
    AuthController = require('../controllers/auth');

module.exports = (app) => {

    authRoutes.post('/login', AuthController.login);

    authRoutes.post('/register', AuthController.register);

    app.use('/', authRoutes)

};

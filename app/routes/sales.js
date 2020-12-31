const express = require('express'),
    salesRoutes = express.Router(),
    SaleController = require('../controllers/sale'),
    isAuth = require('../../config/passport').checkIsAuth;

module.exports = (app) => {

    salesRoutes.get('/sales', isAuth, SaleController.getAll);

    app.use('/', salesRoutes)

};

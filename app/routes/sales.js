const express = require('express'),
    salesRoutes = express.Router(),
    SaleController = require('../controllers/sale');

module.exports = (app) => {

    salesRoutes.get('/sales', SaleController.getAll);

    app.use('/', salesRoutes)

};

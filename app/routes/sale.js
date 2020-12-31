const express = require('express'),
    saleRoutes = express.Router(),
    SaleController = require('../controllers/sale'),
    isAuth = require('../../config/passport').checkIsAuth;

module.exports = (app) => {

    saleRoutes.get('/sale/:id', isAuth, SaleController.getById);

    saleRoutes.post('/sale', isAuth, SaleController.add);

    saleRoutes.put('/sale/:id', isAuth, SaleController.updateById);

    saleRoutes.delete('/sale/:id', isAuth, SaleController.deleteById);

    app.use('/', saleRoutes);

};

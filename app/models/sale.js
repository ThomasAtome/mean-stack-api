const mongoose = require('mongoose');

const SaleSchema = new mongoose.Schema({

    saleDate: {
        type: Date,
        required: true
    },
    items: {
        type: Array,
        required: true,
        blackbox: true
    },
    storeLocation: {
        type: String,
        required: true
    },
    customer: {
        gender: {
            type: String,
            required: true
        },
        age: {
            type: Number,
            required: true
        },
        email: {
            type: String,
            required: true
        },
        satisfaction: {
            type: Number,
            required: true
        },
    },
    couponUsed: {
        type: Boolean,
        required: true
    },
    purchasedMethod: {
        type: String,
        required: true
    }

});


module.exports = mongoose.model('Sale', SaleSchema, 'sales');

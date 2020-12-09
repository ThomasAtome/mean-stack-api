const Sale = require('../models/sale');

const {ObjectId} = require("bson");

/**
 * Method used for retrieve all the sales
 * @param req
 * @param res
 * @param next
 */
exports.getAll = (req,res,next) => {

    Sale
        .find()
        .limit(40)
        .exec((err, sales) => {
            if(err) {
                res.status(400).json(err);
            }

            res.status(200).json(sales);
        });

};

/**
 * Method used for retrieve a sale by his id
 * @param req
 * @param res
 * @param next
 */
exports.getById = (req,res,next) => {

    Sale
        .findById(req.params.id)
        .exec((err, sale) => {
            if(err) {
                res.status(400).json(err);
            }

            res.status(200).json(sale);
        });

};

/**
 * Method used for add a new sale
 * @param req
 * @param res
 * @param next
 */
exports.add = (req,res,next) => {

    new Sale(req.body).save((err, sale) => {
        if(err) {
            res.status(400).json(err);
        }

        res.status(200).json(sale);
    });

};

/**
 * Method used for update a sale by his id
 * @param req
 * @param res
 * @param next
 */
exports.updateById = (req,res,next) => {

    Sale
        .update({_id: new ObjectId(req.params.id)}, req.body, {new: true})
        .exec((err, info) => {

            if (err) {
                res.status(400).json(err);
            }

            res.status(200).json(info);

        });

};

/**
 * Method used for delete a sale by his id
 * @param req
 * @param res
 * @param next
 */
exports.deleteById = (req,res,next) => {

    Sale
        .deleteOne({_id: new ObjectId(req.params.id)})
        .exec((err, info) => {
            if(err) {
                res.status(400).json(err);
            }

            res.status(200).json(info);
        });

};

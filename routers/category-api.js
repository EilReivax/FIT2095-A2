const Category = require('../models/category');
const Event = require('../models/event');
const Operation = require('../models/operation');

let OPERATION_ID = 'OPERATION_ID';

module.exports = {
    createOne: async function (req, res) {
        let categoryDetails = req.body;
        let newCategory = new Category(categoryDetails);
        await newCategory.save();
        let operation = await Operation.findById(OPERATION_ID);
        operation.create();
        res.json({ categoryId: newCategory.categoryId });
    },
    getAll: async function (req, res) {
        let categories = await Category.find()
            .populate('eventList')
            .exec();
        res.json(categories);
    },
    updateOne: async function (req, res) {
        let operation = await Operation.findById(OPERATION_ID);
        await Category.updateOne({
            categoryId: req.body.categoryId
        }, {
            name: req.body.name, 
            description: req.body.description
        }, (err) => {
            if (err, result) {
                res.json({
                    status: result
                });
            } else {
                operation.update();
                res.json({
                    status: result
                });
            }
        });
    },
    deleteOne: async function (req, res) {
        let category = await Category.findOne({ categoryId: req.body.categoryId });
        Event.updateMany(
            { categoryList: { $in: [category._id] } },
            { $pull: { categoryList: category._id } }
        )
        let deleteStatus = await Category.deleteOne({ _id: category._id });
        let operation = await Operation.findById(OPERATION_ID);
        operation.delete();
        res.json(deleteStatus);
    }
}
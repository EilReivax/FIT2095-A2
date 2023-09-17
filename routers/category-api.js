const Category = require('../models/category');
const Operation = require('../models/operation');

let OPERATION_ID = 'OPERATION_ID';
let operation = Operation.findById(OPERATION_ID);

module.exports = {
    createOne: async function (req, res) {
        let categoryDetails = req.body;
        let newCategory = new Category(categoryDetails);
        await newCategory.save();

        res.json({ categoryId: newCategory.categoryId });
    },

    getAll: async function (req, res) {
        let categories = await Category.find()
            .populate('eventList')
            .exec();
        res.json(categories);
    },

    updateOne: async function (req, res) {
        let obj = await Category.updateOne({
            categoryId: req.body.categoryId
        }, {
            name: req.body.name, 
            description: req.body.description
        });
        if (obj.acknowledged) {
            res.json({
                status: "updated successfully"
            });
        }
        res.json({
            status: "failed to update"
        });
    },

    deleteOne: async function (req, res) {
        let obj = await Category.deleteOne({ categoryId: req.body.categoryId });
        res.json(obj);
    }
}
const mongoose = require('mongoose');

const Category = require('../models/category');
const Event = require('../models/event');
const Operation = require('../models/operation');

let OPERATION_ID = 'OPERATION_ID';

module.exports = {
    createOne: async function (req, res) {
        let categoryDetails = req.body;
        let newCategory = new Category(categoryDetails);
        await newCategory.save();

        await Operation.updateOne(
            { _id: OPERATION_ID },
            { $inc: { createCount: 1 } }
        )

        res.redirect('/category/32528558/view-all');
    },
    getAll: async function (req, res) {
        let categories = await Category.find()
            .populate('eventList')
            .exec();

        res.render("view-categories", { records: categories });
    },
    getOne: async function (req, res) {
        let category = await Category.findOne({ categoryId: req.params.categoryId })
            .populate('eventList')
            .exec();

        let events = await Event.find({ categoryList: category._id })
            .populate('categoryList')
            .exec();

        res.render("view-category-details", { category: category, events: events });
    },
    search: async function (req, res) {
        let keyword = req.query.keyword;
        let categories = await Category.find({ description: { $regex: keyword, "$options": "i" } });
        res.render('search-category', { records: categories });
    },
    deleteOne: async function (req, res) {
        let category = await Category.findOne({ categoryId: req.body.categoryId });

        let updateStatus = await Event.updateMany(
            { categoryList: { $in: [category._id] } },
            { $pull: { categoryList: category._id } }
        );

        let deleteStatus = await Category.deleteOne({ categoryId: req.body.categoryId });

        await Operation.updateOne(
            { _id: OPERATION_ID },
            {
                $inc: {
                    updateCount: updateStatus.modifiedCount,
                    deleteCount: deleteStatus.deletedCount
                }
            }
        );

        res.redirect('category/32528558/view-all');
    }
}
const mongoose = require('mongoose');
const Event = require('../models/event');
const Category = require('../models/category');

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
    },


    webCreateOne: async function (req, res) {
        let categoryDetails = req.body;
        let newCategory = new Category(categoryDetails);
        await newCategory.save();
        res.redirect('/category/32528558/view-all');
    },

    webGetAll: async function (req, res) {
        let categories = await Category.find()
            .populate('eventList')
            .exec();
        res.render("view-categories", { records: categories });
    },

    webGetOne: async function (req, res) {
        let category = await Category.findOne({ categoryId: req.params.categoryId })
            .populate('eventList')
            .exec();

        let events = await Event.find({ categoryList: category._id })
            .populate('categoryList')
            .exec();

        res.render("view-category-details", { category: category, events: events });
    },

    webDeleteOne: async function (req, res) {
        let obj = await Category.deleteOne({ categoryId: req.body.categoryId });
        res.redirect('category/32528558/view-all');
    },

    webSearch: async function (req, res) {
        let keyword = req.query.keyword;

        let categories = await Category.find({ description: { $regex: keyword, "$options": "i" } });
        res.render('search-category', { records: categories });
    }
}
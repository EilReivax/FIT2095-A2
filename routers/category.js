const Category = require('../models/category');
const Event = require('../models/event');

module.exports = {
    createOne: async function (req, res) {
        let categoryDetails = req.body;
        let newCategory = new Category(categoryDetails);
        await newCategory.save();
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
        let obj = await Category.deleteOne({ categoryId: req.body.categoryId });
        res.redirect('category/32528558/view-all');
    }
}
const mongoose = require('mongoose');
const Category = require('../models/category');

module.exports = {
    createOne: async function(req, res){
        let categoryName = req.body.name;
        let categoryDescription = req.body.description;
        let categoryImage = req.body.image;
        let newCategory = new Category(categoryName, categoryDescription, categoryImage);
        await newCategory.save();
        res.json(newCategory.id);
    },

    getAll: async function(req, res){
        let categories = await Category.find()
            .populate('eventList')
            .exec();
    },

    deleteOne: async function(req, res){
        let obj = await Category.findOneAndDelete({categoryId: req.body.id});
        res.json();
    }
}
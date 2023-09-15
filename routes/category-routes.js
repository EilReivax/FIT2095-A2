const mongoose = require('mongoose');
const Category = require('../models/category');

module.exports = {
    createOne: async function(req, res){
        let categoryDetails = req.body;
        let newCategory = new Category(categoryDetails);
        await newCategory.save();
        res.json(newCategory.categoryId);
    },

    getAll: async function(req, res){
        let categories = await Category.find()
            // .populate('eventList')
            // .exec();
            res.json(categories);
    },

    deleteOne: async function(req, res){
        let obj = await Category.deleteOne({categoryId: req.body.categoryId});
        res.json(obj);
    },

    updateOne: async function(req, res){
        let obj = await Category.findOneAndUpdate({categoryId: req.body.categoryId}, {name: req.body.name, description: req.body.description});
        res.json(obj);
    },

    webCreateOne: async function(req, res){
        let categoryDetails = req.body;
        let newCategory = new Category(categoryDetails);
        await newCategory.save();
        res.redirect('/category/32528558/view-all');
    },

    webGetAll: async function(req, res){
        let categories = await Category.find()
            // .populate('eventList')
            // .exec();
            res.render("view-categories", {records: categories});
    },

    webDeleteOne: async function(req, res){
        let obj = await Category.deleteOne({categoryId: req.body.categoryId});
        res.redirect('category/32528558/view-all');
    }
}
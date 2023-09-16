const mongoose = require('mongoose');

const Category = require('../models/category');
const Event = require('../models/event');

module.exports = {
    createOne: async function (req, res) {
        let categoryList = [];
        let name = req.body.name;
        let description = req.body.description;
        let date = req.body.date;
        let duration = req.body.duration;
        let isActive = req.body.isActive;
        let image = req.body.image;
        let capacity = req.body.capacity;
        let availability = req.body.availability;
        let categories = req.body.categories.split(',');

        if (!capacity) {
            capacity = 1000;
        }

        for (let i = 0; i < categories.length; i++) {
            categoryList.push(Category.find({categoryId: categories[i]})._id);
        }

        let newEvent = new Event({
            name: name,
            description: description,
            date: date,
            duration: duration,
            isActive: isActive,
            image: image,
            capacity: capacity,
            availability: availability,
            categoryList: categoryList
        });

        await newEvent.save();
        res.json(newEvent.eventId);
    },
    getAll: async function (req, res) {
        let events = await Event.find()
            .populate('categoryList')
            .exec();

        res.json(events);
    },
    updateOne: async function (req, res) {
        let eventId = req.params.eventId;
        let name = req.body.name;
        let capacity = req.body.capacity;

        await Event.findOnedAndUpdate({
            eventId: eventId
        }, {
            name: name,
            capacity: capacity
        });
    },
    deleteOne: async function (req, res) {
        await Event.findOneAndDelete({eventId: req.params.eventId});
        
        res.json({ 
            acknowledged: true,
            deleteCount: Event.categoryList.length()
        });
    },
    webCreateOne: async function (req, res) {        
        let categoryList = [];
        let name = req.body.name;
        let description = req.body.description;
        let date = req.body.date;
        let duration = req.body.duration;
        let isActive = req.body.isActive;
        let image = req.body.image;
        let capacity = req.body.capacity;
        let availability = req.body.availability;
        let categories = req.body.categories.split(',');

        if (!capacity) {
            capacity = 1000;
        }

        for (let i = 0; i < categories.length; i++) {
            let category = await Category.findOne({categoryId: categories[i]});
            categoryList.push(category._id);
        }

        let newEvent = new Event({
            name: name,
            description: description,
            date: date,
            duration: duration,
            isActive: isActive,
            image: image,
            capacity: capacity,
            availability: availability,
            categoryList: categoryList
        });

        for (let i = 0; i < categoryList.length; i++) {
            let category = await Category.findById(categoryList[i]);
            category.eventList.push(newEvent._id);
            await category.save();
        }
        
        await newEvent.save();
        res.redirect("/event/michael/view-all");
    },
    webGetAll: async function (req, res) {        
        let events = await Event.find()
            .populate('categoryList')
            .exec();

        res.render("view-events", {events: events});
    },
    webGetSoldout: async function (req, res) {        
        let events = await Event.find({availability: 0})
            .populate('categoryList')
            .exec();

        res.render("view-events", {events: events});
    },
    webDeleteOne: async function (req, res) {
        await Event.findOneAndDelete({eventId: req.params.eventId});
        res.redirect("/event/michael/view-all");
    }
}
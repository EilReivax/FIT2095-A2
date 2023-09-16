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
        res.json({eventId: newEvent.eventId});
    },
    getAll: async function (req, res) {
        let events = await Event.find()
            .populate('categoryList')
            .exec();

        res.json(events);
    },
    updateOne: async function (req, res) {
        let eventId = req.body.eventId;
        let name = req.body.name;
        let capacity = req.body.capacity;

        let event = await Event.updateOne({
            eventId: eventId
        }, {
            name: name,
            capacity: capacity
        });
        if (event.acknowledged) {
            res.json({
                status: "updated successfully"
            });
        }
        res.json({
            status: "failed to update"
        });
    },
    deleteOne: async function (req, res) {
        let event = await Event.deleteOne({eventId: req.body.eventId});
        res.json(event);
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
    webGetOne: async function (req, res) {
        let event = await Event.findOne({eventId: req.params.eventId})
            .populate('categoryList')
            .exec();
        res.render("view-event-details", {event: event});
    },
    webGetSoldout: async function (req, res) {        
        let events = await Event.find({availability: 0})
            .populate('categoryList')
            .exec();

        res.render("view-events", {events: events});
    },
    webDeleteOne: async function (req, res) {
        await Event.deleteOne({eventId: req.params.eventId});
        res.redirect("/event/michael/view-all");
    }
}
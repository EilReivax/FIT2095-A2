const mongoose = require('mongoose');

const Category = require('../models/category');
const Event = require('../models/event');

module.exports = {
    createOne: async function (req, res) {
        let name = req.body.name;
        let description = req.body.description;
        let date = req.body.capacity;
        let duration = req.body.duration;
        let isActive = req.body.isActive;
        let image = req.body.image;
        let capacity = req.body.capacity;
        let availability = req.body.availability;
        let categoryList = req.body.categoryList.split(',');

        let newEvent = new Event(name, description, date, duration, isActive, image, capacity, availability, categoryList);
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
        let name = req.body.name;
        let description = req.body.description;
        let date = req.body.capacity;
        let duration = req.body.duration;
        let isActive = req.body.isActive;
        let image = req.body.image;
        let capacity = req.body.capacity;
        let availability = req.body.availability;
        let categoryList = req.body.categoryList.split(',');

        let newEvent = new Event(name, description, date, duration, isActive, image, capacity, availability, categoryList);
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
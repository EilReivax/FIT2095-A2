const mongoose = require('mongoose');

const Category = require('./models/category');
const Event = require('./models/event');

module.exports = {
    createOne: async function (req, res) {
        let newEvent = new Event(req.body);
        await newEvent.save();
        res.json(newEvent.eventId);
    },
    getAll: async function (req, res) {
        let events = await Event.find()
        // .populate('categoryList')
        // .exec();

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
        let newEvent = new Event(req.body);
        await newEvent.save();
        res.redirect("/event/michael/view-all");
    },
    webGetAll: async function (req, res) {        
        let events = await Event.find()
        // .populate('categoryList')
        // .exec();

        res.render("view-events", {events: events});
    },
    webGetSoldout: async function (req, res) {        
        let events = await Event.find({availability: 0})
        // .populate('categoryList')
        // .exec();

        res.render("view-events", {events: events});
    },
    webDeleteOne: async function (req, res) {
        await Event.findOneAndDelete({eventId: req.params.eventId});
        res.redirect("/event/michael/view-all");
    }
}
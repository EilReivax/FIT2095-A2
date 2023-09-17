const Category = require('../models/category');
const Event = require('../models/event');
const Operation = require('../models/operation');

let OPERATION_ID = 'OPERATION_ID';

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
        let operation = await Operation.findById(OPERATION_ID);
        operation.create();
        res.redirect("/event/michael/view-all");
    },
    getAll: async function (req, res) {        
        let events = await Event.find()
            .populate('categoryList')
            .exec();

        res.render("view-events", {events: events});
    },
    getOne: async function (req, res) {
        let event = await Event.findOne({eventId: req.params.eventId})
            .populate('categoryList')
            .exec();
        res.render("view-event-details", {event: event});
    },
    getSoldout: async function (req, res) {        
        let events = await Event.find({availability: 0})
            .populate('categoryList')
            .exec();

        res.render("view-events", {events: events});
    },
    deleteOne: async function (req, res) {
        let event = await Event.findOne({eventId: req.body.eventId});
        Category.updateMany(
            { eventList: { $in: [event._id] } },
            { $pull: { eventList: event._id } }
        )
        await Event.deleteOne({_id: event._id});
        let operation = await Operation.findById(OPERATION_ID);
        operation.delete();
        res.redirect("/event/michael/view-all");
    }
}
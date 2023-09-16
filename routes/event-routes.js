const mongoose = require('mongoose');

const category = require('./models/category');
const Event = require('./models/event');

module.exports = {
    createOne: async function (req, res) {
        let name = req.body.name
        let description = req.body.description
        let date = req.body.startDate
        let duration = req.body.duration
        let isActive = req.body.isActive
        let image = req.body.image
        let capacity = req.body.capacity
        let availability = req.body.availability
        let categoryId = req.body.categoryId
        let newEvent = new Event(name, description, date, duration, isActive, image, capacity, availability, categoryId);

        await newEvent.save();
        res.json(newEvent);
    }
}
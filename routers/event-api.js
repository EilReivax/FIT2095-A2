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
    }
}
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
        res.json({eventId: newEvent.eventId});
    },
    getAll: async function (req, res) {
        let events = await Event.find()
            .populate('categoryList')
            .exec();

        res.json(events);
    },
    updateOne: async function (req, res) {
        let operation = await Operation.findById(OPERATION_ID);
        let eventId = req.body.eventId;
        let name = req.body.name;
        let capacity = req.body.capacity;

        await Event.updateOne({
            eventId: eventId
        }, {
            name: name,
            capacity: capacity
        }, (err) => {
            if (err, result) {
                res.json({
                    status: err
                });
            } else {
                operation.update();
                res.json({
                    status: result
                });
            }
        });
    },
    deleteOne: async function (req, res) {
        let event = await Event.findOne({eventId: req.body.eventId});
        Category.updateMany(
            { eventList: { $in: [event._id] } },
            { $pull: { eventList: event._id } }
        )
        let deleteStatus = await Event.deleteOne({_id: event._id});
        let operation = await Operation.findById(OPERATION_ID);
        operation.delete();
        res.json(deleteStatus);
    }
}
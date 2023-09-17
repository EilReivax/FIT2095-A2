const Category = require("../models/category");
const Event = require("../models/event");
const Operation = require("../models/operation");

const OPERATION_ID = 'OPERATION_ID'

module.exports = {
    createOperation: async function (req, res) {
        let operation = new Operation();
        await operation.save();
    },
    getAll: async function (req, res) {
        operation = await Operation.findById(OPERATION_ID);
        let categoryCount = await Category.countDocuments();
        let eventCount = await Event.countDocuments();
        let createCount = operation.createCount;
        let updateCount = operation.updateCount;
        let deleteCount = operation.deleteCount;

        console.log (`categoryCount: ${categoryCount} | eventCount: ${eventCount} | createCount: ${createCount} | updateCount: ${updateCount} | deleteCount: ${deleteCount}`);

        res.render("index", {
            categoryCount: categoryCount, 
            eventCount: eventCount,
            createCount: createCount,
            updateCount: updateCount,
            deleteCount: deleteCount
        });
    }
}
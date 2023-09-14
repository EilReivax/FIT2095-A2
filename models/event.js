const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: {
        type: String,
        required: true
    },
    description: String,
    date: {
        type: Date,
        required: true
    },
    duration: {
        type: Number,
        required: true
    },
    isActive: {
        type: Boolean,
        default: true
    },
    image: {
        types: String
    },
    capacity: {
        type: Number,
        default: 1000,
        min: 10,
        max: 2000
    },
    availability: {
        type: Number
    },
    category_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category'
    },
    categoryList: Array
});

module.exports = mongoose.model('Event', eventSchema);
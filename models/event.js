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
        validate: {
            validator: function (value) {
                if (value <= 10 && value >= 2000) {
                    return true;
                }
                else {
                    return false
                }
            },
            message: 'Capacity must be between 10 and 2000'
        }
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
const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: {
        type: String,
        required: true
    },
    description: String,
    image: String,
    date: {
        type: Date,
        default: Date.now
    },
    eventList: [{
        type: mongoose.Schema.ObjectId,
        ref: 'Event'
    }]
})

module.exports("Category", categorySchema);
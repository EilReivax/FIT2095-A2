const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
    eventId: {
        type: String,
        default: generateId()
    },
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
        type: String
    },
    capacity: {
        type: Number,
        validate: {
            validator: function (value) {
                if (value >= 10 && value <= 2000) {
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
    categoryList: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category'
    }],
});

eventSchema.methods.end = function () {
    let endDate = new Date(this.date.getTime() + this.duration * 60000);
    return endDate.toLocaleString();
}

function getRandomLetter(){
    alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    randInt = getRandomNum(26);
    return alphabet[randInt];
}

function getRandomNum(max){
    return Math.floor(Math.random() * max);
}

function generateId() {
    let letter1 = getRandomLetter();
    let letter2 = getRandomLetter();
    let num = (Math.floor(Math.random() * 10000) + 10000).toString().substring(1);
    let id = `E${letter1}${letter2}-${num}`;
    return id;
}

module.exports = mongoose.model('Event', eventSchema);
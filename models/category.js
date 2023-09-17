const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
    categoryId: {
        type: String,
        default: generateID()
    },
    name: {
        type: String,
        required: true
    },
    description: String,
    image: {
        type: String,
        default: '/no-image.jpg'
    },
    date: {
        type: Date,
        default: Date.now
    },
    eventList: [{
        type: mongoose.Schema.ObjectId,
        ref: 'Event'
    }]
})

function generateID(){
    let letter1 = getRandomLetter();
    let letter2 = getRandomLetter();
    let num = (Math.floor(Math.random() * 10000) + 10000).toString().substring(1);
    let ID = `C${letter1}${letter2}-${num}`;
    return ID;
}

function getRandomNum(max){
    return Math.floor(Math.random() * max);
}

function getRandomLetter(){
    alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    randInt = getRandomNum(26);
    return alphabet[randInt];
}

module.exports = mongoose.model("Category", categorySchema);
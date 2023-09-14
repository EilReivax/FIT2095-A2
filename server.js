const express = require('express');
const mongoose = require('mongoose');

const category = require('.routers/category');
const event = require('.routers/event');

const app = express();

app.listen(8080);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

async function connect() {
    await mongoose.connect('mongodb://localhost:27017/assignment-2');
}
connect().catch(err => console.log(err));

app.post('/event', event.createOne);
app.get('/event', event.getAll);
app.delete('/event', event.deleteOne);
app.put('/event', event.updateOne);

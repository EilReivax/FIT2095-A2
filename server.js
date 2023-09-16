const express = require('express');
const mongoose = require('mongoose');

// const category = require('.routers/category');
const event = require('.routes/event-routes');

const app = express();

app.listen(8080);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

async function connect() {
    await mongoose.connect('mongodb://localhost:27017/assignment-2');
}
connect().catch(err => console.log(err));

// Add event endpoints
app.get('/api/v1/event/michael/add-event', function (req, res) {
    res.render('add-event');
});
app.post('/api/v1/event/michael/add-event', event.createOne);

// View all events endpoint
app.get('/api/v1/event/michael/view-events', function (req, res) {
    let json = event.getAll
});

// View soldout events endpoint
app.get('/api/v1/event/michael/view-events-soldout', getAllSoldout);

// View event details endpoint
app.get('/api/v1/event/michael/view-event-details/:id', event.getOne);

// Delete event endpoint
app.delete('/api/v1/event/michael/delete-event/', event.deleteOne);

// Update event endpoint
app.put('/api/v1/event/michael/event', event.updateOne);

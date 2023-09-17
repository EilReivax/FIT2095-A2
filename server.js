const express = require('express');
const mongoose = require('mongoose');

const Event = require('./routers/event');
const Category = require('./routers/category');
const EventApi = require('./routers/event-api');
const CategoryApi = require('./routers/category-api');
const Stats = require('./controllers/stats');

const PORT_NUMBER = 8080;

const app = express();

app.listen(PORT_NUMBER, function() {
    console.log(`listening on port ${PORT_NUMBER}`);
});

app.use(express.static("node_modules/bootstrap/dist/css"));
app.use(express.static("images"));

app.engine("html", require("ejs").renderFile);
app.set("view engine", "html");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

async function connect() {
    await mongoose.connect('mongodb://localhost:27017/assignment-2');
}
connect().catch(err => console.log(err));

// Home page
app.get('/', Stats.getAll);

// Category HTML endpoints
app.get('/category/32528558/add', function (req, res) {
    res.render("add-category");
})
app.post('/add-category-post', Category.createOne);
app.get('/category/32528558/delete', function (req, res) {
    res.render('delete-category');
})
app.post('/delete-event-category', Category.deleteOne);
app.get('/category/32528558/view-all', Category.getAll);
app.get('/event/32528558/view-details/:eventId', Event.getOne);
app.get('/category/32528558/search-category', Category.search);

// Category API endpoints
app.post('/api/v1/category/32528558/add', CategoryApi.createOne);
app.get('/api/v1/category/32528558/view-all', CategoryApi.getAll);
app.put('/api/v1/category/32528558/edit', CategoryApi.updateOne);
app.delete('/api/v1/category/32528558/delete', CategoryApi.deleteOne);

// Event HTML endpoints
app.get('/event/michael/add', function (req, res) {
    res.render('add-event');
});
app.post('/event/michael/add', Event.createOne);
app.get('/event/michael/view-all', Event.getAll);
app.get('/event/michael/view-soldout', Event.getSoldout);
app.get('/category/michael/view-details/:categoryId', Category.getOne);
app.get('/event/michael/delete', Event.deleteOne);

// Event API endpoints
app.post('/api/v1/event/michael/add', EventApi.createOne);
app.get('/api/v1/event/michael/view-all', EventApi.getAll);
app.put('/api/v1/event/michael/edit', EventApi.updateOne);
app.delete('/api/v1/event/michael/delete', EventApi.deleteOne);

// 404 page
app.get("*", function (req, res) {
    res.render("404");
});
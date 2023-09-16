const express = require('express');
const mongoose = require('mongoose');

const Event = require('./routes/event-routes');
const Category = require('./routes/category-routes');

const app = express();

app.listen(8080);

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

app.get('/', function (req, res) {
    res.render("index");
})

// Category HTML endpoints
app.get('/category/32528558/add', function (req, res) {
    res.render("add-category");
})
app.post('/add-category-post', Category.webCreateOne);
app.get('/category/32528558/delete', function (req, res) {
    res.render('delete-category');
})
app.post('/delete-event-category', Category.webDeleteOne);
app.get('/category/32528558/view-all', Category.webGetAll);
app.get('/category/32528558/search-category', Category.webSearch);

// Category API endpoints
app.post('/api/v1/category/32528558/add', Category.createOne);
app.get('/api/v1/category/32528558/view-all', Category.getAll);
app.put('/api/v1/category/32528558/edit', Category.updateOne);
app.delete('/api/v1/category/32528558/delete', Category.deleteOne);

// Event endpoints
app.get('/event/michael/add', function (req, res) {
    res.render('add-event');
});
app.post('/event/michael/add', Event.webCreateOne);
app.get('/event/michael/view-all', Event.webGetAll);
app.get('/event/michael/view-soldout', Event.webGetSoldout);
app.get('/category/michael/view-details/:id', Category.webGetOne);
app.get('/event/michael/delete', Event.webDeleteOne);

// Event API endpoints
app.post('/api/v1/event/michael/add', Event.createOne);
app.get('/api/v1/event/michael/view-all', Event.getAll);
app.put('/api/v1/event/michael/edit', Event.updateOne);
app.delete('/api/v1/event/michael/delete', Event.deleteOne);
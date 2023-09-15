const express = require('express');
const mongoose = require('mongoose');

// const category = require('.routers/category');
// const event = require('./routes/event-routes');
const categories = require('./routes/category-routes');

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

// app.post('/event', event.createOne);
// app.get('/event', event.getAll);
// app.delete('/event', event.deleteOne);
// app.put('/event', event.updateOne);

app.get('/categories', categories.getAll);
app.post('/categories', categories.createOne);
app.delete('/categories', categories.deleteOne);
app.put('/categories', categories.updateOne);

app.get('/category/32528558/add', function (req,res){
    res.render("add-category");
})

app.get('/category/32528558/delete', function(req,res){
    res.render('delete-category');
})

app.post('/add-category-post', categories.webCreateOne);
app.get('/category/32528558/view-all', categories.webGetAll);
app.post('/delete-event-category', categories.webDeleteOne);
app.get('/category/32528558/search-category', categories.webSearch);
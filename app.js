//declare express variable of which use plugin
var express = require('express'),
    mongoose = require('mongoose');

var db = mongoose.connect('mongodb://localhost/bookAPI');

var Book = require('./models/bookModel');

//app variable = method call declared variable in line 2
var app = express();

//initialize port no of env , if not installed default 3000
var port = process.env.PORT || 3000;
var bookRouter = express.Router();

bookRouter.route('/Books')
    .get(function (req, res) {
        var query = {};
        if (req.query.genre) {
            query.genre = req.query.genre;
        }
        Book.find(query, function (err, books) {
            if (err) {
                res.status(500).send(err);
            } else {
                res.json(books);
            }
        });
    });

bookRouter.route('/Books/:bookId')
    .get(function (req, res) {
        Book.findById(req.params.bookId, function (err, book) {
            if (err) {
                res.status(500).send(err);
            } else {
                res.json(book);
            }
        });
    });

app.use('/api', bookRouter);

//variable declared in line 5 app. get method = has 2 parameters (/ , function call back - 2 para - request and respond)
app.get('/', function (req, res) {
    res.send('Welcome to my API!');
});

//will call listen method -(arg can be none- here 2 args- port , call back function )
app.listen(port, function () {
    console.log('Running on port: ' + port);
});
//declare express variable of which use plugin
var express = require('express'),
    mongoose = require('mongoose'),
    bodyParser = require('body-parser');

var db = mongoose.connect('mongodb://db_user:bookapi123@ds062059.mlab.com:62059/bookapi');

var Book = require('./models/bookModel');

//app variable = method call declared variable in line 2
var app = express();

//initialize port no of env , if not installed default 3000
var port = process.env.PORT || 3000;
 
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

var bookRouter = require('./Routes/bookRoutes')(Book);

app.use('/api/books', bookRouter);

//variable declared in line 5 app. get method = has 2 parameters (/ , function call back - 2 para - request and respond)
app.get('/', function (req, res) {
    res.send('Welcome to my API!');
});

//will call listen method -(arg can be none- here 2 args- port , call back function )
app.listen(port, function () {
    console.log('Running on port: ' + port);
});
// set up ==================================
var express = require('express');
var app = express(); //create our app with express
var mongoose = require('mongoose'); //object modeling for MongoDB
var morgan = require('morgan'); //log request to the console
var bodyParser = require('body-parser'); //pull information from HTML POST
var methodOverride = require('method-override'); //simulate DELETE and PUT
var database = require('./config/database');
require('./app/routes')(app);


// configuration ===========================
mongoose.connect(database.url) //connect to to mongoDB on modulus.io

app.use(express.static(__dirname + '/public')); //set the static files location
app.use(morgan('dev')) //log every request to the console
app.use(bodyParser.urlencoded({'extended':true})); //parse application/x-www-form-urlencoded
app.use(bodyParser.json()); //parse application/json;
app.use(bodyParser.json({type: 'application/vnd.api+json'})); // parse application/vnd.api+json as json
app.use(methodOverride());


// listen ==================================
app.listen(8000, function() {
  console.log('App listening on port 8000...');
});

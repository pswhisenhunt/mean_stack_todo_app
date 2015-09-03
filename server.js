// set up ==================================
var express = require('express');
var app = express(); //create our app with express
var mongoose = require('mongoose'); //object modeling for MongoDB
var morgan = require('morgan'); //log request to the console
var bodyParser = require('body-parser'); //pull information from HTML POST
var methodOverride = require('method-override'); //simulate DELETE and PUT


// configuration ===========================
mongoose.connect('mongodb://node:nodeuser@mongo.onmodulus.net:27017/uwO3mypu') //connect to to mongoDB on modulus.io

app.use(express.static(__dirname + '/public')); //set the static files location
app.use(morgan('dev')) //log every request to the console
app.use(bodyParser.urlencoded({'extended':true})); //parse application/x-www-form-urlencoded
app.use(bodyParser.json()); //parse application/json;
app.use(bodyParser.json({type: 'application/vnd.api+json'})); // parse application/vnd.api+json as json
app.use(methodOverride());


// models ==================================
var Todo = mongoose.model('Todo', {
  text: String
});

// routes ==================================
  // api -----------------------------------
  // get all todos
  app.get('/api/todos', function(req, res) {
    // use mongoose to get all the todos from the db
    Todo.find(function(err, todos) {
      if (err) {res.send(err);}
      res.json(todos);
    });
  });


  // create todos and send back all todos after creation
  app.post('api/todos', function(req, res) {
      // create a todo, data comes from AJAX req from Angular
      Todo.create({
        text: req.body.text,
        done: false
      }, function(err, todo) {
        if (err) { res.send(err);}
        Todo.find(function(err, todos) {
          if (err) {res.send(err);}
          res.json(todos);
        })
      });
  });

  // delete a todo
  app.delete('/api/todos/:todo_id', function(req, res) {
    Todo.remove({
      _id: req.params.todos_id
    }, function(err, todo) {
      if (err) {res.send(err);}
      Todo.find(function(err, todos) {
        if (err) {res.send(err);}
        res.json(todos);
      });
    });
  });

  // application
  app.get('*', function(req, res) {
    // load the single view file. Angular will handle the page changes on the front end.
    res.sendFile('./public/index/html');
  });

// listen ==================================
app.listen(8000, function() {
  console.log('App listening on port 8000...');
});

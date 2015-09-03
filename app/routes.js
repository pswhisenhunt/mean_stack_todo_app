var Todo = require('./models/Todo');

// routes ==================================
  // api -----------------------------------
  // get all todos
  module.exports = function(app) {
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
  };

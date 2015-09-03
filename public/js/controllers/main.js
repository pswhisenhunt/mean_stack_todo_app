angular.module('TodoController', []);
  .controller('mainController', function($scope, $http, $TodoService) {
    $scope.formData = {};

    // when loading on the page, get all todos and show them using the service ($TodoService)
    $TodoService.get()
      .success(function(data) {
        $scope.todos = data;
      })
      .error(function(data) {
        console.log('Opps! Something went wrong');
      });


    $scope.createTodo = function() {
      if (!$.isEmptyObject($scope.formData)) {
        $TodoService.create($scope.formData)
          .success(function(data) {
            $scope.formData = {};
            $scope.todos = data;
          })
          .error(function(data) {
            console.log('Opps! Error!');
          });
        }
    };

    $scope.deleteTodo = function() {
      $TodoService.delete(id)
        .success(function(data) {
          $scope.todos = data;
        })
        .error(function(data) {
          console.log('Error!');
        });
      }
  });

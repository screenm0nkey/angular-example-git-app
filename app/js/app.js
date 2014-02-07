(function (angular) {
'use strict';

// Declare app level module which depends on filters, and services
var app = angular.module('myApp', [
  'ngRoute',
  'ngResource',
  'myApp.filters',
  'myApp.services',
  'myApp.directives',
  'myApp.controllers'
]);

// store the path centrally so they can easily be changed
app.constant('PATH', {
  home : '/commits'
});

app.config(['$routeProvider', 'PATH',
  function($routeProvider, PATH) {

  $routeProvider.when(PATH.home, {
    templateUrl: 'partials/routes/main.html',
    controller: 'MainCtrl',
    resolve : {
      // get the data first for commits page. 'commits' can be injected
      commits : ['GitService', function (resource) {
        // return the promise. the page wont load until this is done;
        return resource.getAllCommits();
      }]
    }
  });

  $routeProvider.when(PATH.home + '/:sha', {
    templateUrl: 'partials/routes/detail.html',
    controller: 'DetailCtrl',
    resolve : {
      // use $route.current.params.key here. The $routeParams is updated only
      // after a route is changed and its that you inject into a controller
      commit : ['$route', 'GitService', function ($route, git) {

        function getAllUserCommits (commit) {
          return git.getAllUserCommits(commit.email).then(function (arr) {
            commit.allCommits = arr;
            return commit;
          });
        }

        return git.getCommit($route.current.params.sha).then(getAllUserCommits);
      }]
    }
  });

  $routeProvider.otherwise({redirectTo: PATH.home});
}]);



}(window.angular));




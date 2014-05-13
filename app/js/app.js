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
      commits : ['GitService', function (git) {
        // return the promise. the page wont load until this is done;
        return git.getAllCommits();
      }]
    }
  });

  $routeProvider.when(PATH.home + '/:sha', {
    templateUrl: 'partials/routes/detail.html',
    controller: 'DetailCtrl',
    resolve : {
      // use $route.current.params.key here. The $routeParams is updated only
      // after a route is changed and its that you inject into a controller
      commit : function ($route, GitService) {
        // the 'cmt' argument value is whatever is returned from git.getCommit()
        // in the chained promises below.
        function getAllUserCommits (cmt) {
          return GitService.getAllUserCommits(cmt.email).then(function (arr) {
            cmt.allCommits = arr;
            return cmt;
          });
        }

        return GitService.getCommit($route.current.params.sha).then(getAllUserCommits);
      }
    }
  });

  $routeProvider.otherwise({redirectTo: PATH.home});
}]);



}(window.angular));




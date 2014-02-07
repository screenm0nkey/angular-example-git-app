/* Controllers */

(function (angular) {
'use strict';

  var app = angular.module('myApp.controllers', []);

  // 'commits' is injected in from the resolve call in the api
  app.controller('MainCtrl', ['$scope','GitService', 'commits',
    function($scope, resource, commits) {
      $scope.model = {
        // this is the format of the columns
        columns : [6,2,2,2],
        headings : ['Description', 'Commit', 'Author', 'Date'],
        commits : commits
      };
    }
  ]);

  app.controller('DetailCtrl', [
    '$scope', '$location', 'commit', 'PATH',
  function ($scope, $location, commit, PATH) {
    // these control the state of the buttons
    $scope.nextDis = !commit.nextSha;
    $scope.prevDis = !commit.prevSha;

    $scope.previous = function (commit) {
      $location.url(PATH.home + '/' + commit.prevSha);
    };

    $scope.next = function (commit) {
      $location.url(PATH.home + '/' +  commit.nextSha);
    };

    $scope.show = function (sha, $event) {
      $($event.target).next('p').toggle();
      // Prevent bubbling to showItem.
      // On recent browsers, only $event.stopPropagation() is needed
      if ($event.stopPropagation) {$event.stopPropagation();}
      if ($event.preventDefault) {$event.preventDefault();}
      $event.cancelBubble = true;
      $event.returnValue = false;
    };

    $scope.commit = commit;
  }]);

}(window.angular));

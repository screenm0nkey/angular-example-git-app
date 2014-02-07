/* Directives */

(function (angular) {
  'use strict';

  var app = angular.module('myApp.directives', []);

  app.directive('mainNavigation', function() {
    return {
      restrict:'A',
      replace: true,
      templateUrl:'partials/directives/navigation.html',
      scope:{},
      controller : ['$scope', 'PATH', function ($scope, PATH) {
        $scope.home = '#' + PATH.home;
        $scope.title = 'Commit List';
      }]
    };
  });

  app.directive('commitTable', function() {
    return {
      restrict:'E',
      replace: true,
      transclude: true,
      scope:{
        headings : '=',
        columns : '='
      },
      templateUrl:'partials/directives/commit-table.html',
      controller : ['$scope', function ($scope) {
        // returns the column width as bootstrap class
        this.getColmnWidths = function (index) {
          return 'col-sm-' + $scope.columns[index];
        };
        $scope.getClass = this.getColmnWidths;
      }]
    };
  });

  app.directive('commitRow', ['PATH', function(PATH) {
    return {
      restrict:'E',
      replace: true,
      require: '^commitTable',
      scope:{
        commit : '='
      },
      templateUrl:'partials/directives/commit-row.html',
      controller : ['$scope', '$location', function ($scope, $location) {
        $scope.showDetailedInfo = function (sha) {
          $location.url(PATH.home + '/' + sha);
        };
      }],
      link : function (scope, element, attrs, ctrl) {
        scope.getClass = ctrl.getColmnWidths;
      }
    };
  }]);



}(window.angular));

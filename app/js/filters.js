'use strict';

/* Filters */
// version is injected in from value service
angular.module('myApp.filters', []).
  filter('shorten', function() {
    return function(text, count) {
      text = text.substring(0, count) + '...';
      return text;
    };
  });

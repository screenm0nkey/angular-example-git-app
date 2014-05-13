/* Services */

(function (angular) {
  'use strict';

  var app = angular.module('myApp.services', ['ngResource']);

  app.factory('GitService', ['$rootScope', '$resource', '$q',

  function ($rootScope, $resource, $q) {
    var localUrl = '/data/commits/:id',
        gitUrl = 'https://api.github.com/repos/angular/angular.js/commits/:id',
        gitResource = $resource(gitUrl, {id: '@id'}),
        localResource = $resource(localUrl, {id: '@id'}),

    getCommit = function (sha) {
      var deferred = $q.defer();

      localResource.get({id: sha },
        function success (commit) {
          // contains details of the user who made the commit
          deferred.resolve({
            name     : commit.commit.committer.name,
            email    : commit.commit.committer.email,
            date     : commit.commit.committer.date,
            message  : commit.commit.message,
            gravatar : commit.committer.avatar_url,
            sha      : commit.sha,
            nextSha  : commit.next,
            prevSha  : commit.previous
          });
        },
        function error (response) {
          deferred.reject(response);
        });
      return deferred.promise;
    },

    getAllUserCommits = function (userId) {
      var deferred = $q.defer();

      gitResource.query({ author : userId },
        function success (arr) {
          arr = _.map(arr, function (commit) {
            return {
              date    : commit.commit.committer.date,
              sha     : commit.sha,
              message : commit.commit.message
            };
          });
          deferred.resolve(arr);
        },
        function error (response) {
          deferred.reject(response);
        });

      return deferred.promise;
    },

    getAllCommits = function() {
      var deferred = $q.defer();

      localResource.query(function success (commits) {
        // create a commit object
        var mapArr = _.map(commits, function (commit) {
          return {
            name     : commit.commit.committer.name,
            date     : commit.commit.committer.date,
            sha      : commit.sha,
            message  : commit.commit.message,
            gravatar : commit.committer.avatar_url
          };
        });

        deferred.resolve(mapArr);
      }, function error (resp) {
        deferred.reject(resp);
      });

      return deferred.promise;
    };


    return {
      getCommit : getCommit,
      getAllCommits : getAllCommits,
      getAllUserCommits : getAllUserCommits
    };
  }]);



}(window.angular));

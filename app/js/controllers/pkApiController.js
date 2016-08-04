'use strict';

angular.module('appPokedex').controller('pkApiController',
	['$scope', 'pkApiFactory', function($scope, pkApiFactory) {
    $scope.pokemons = [];

    $scope.populate = function(){
      return $scope.pokemons = pkApiFactory.populate();
    };
	}]
);

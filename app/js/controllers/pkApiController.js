'use strict';

angular.module('appPokedex').controller('pkApiController',
	['$scope', 'pkApiFactory', function($scope, pkApiFactory) {
    $scope.pokemons = [];
		$scope.showActions = false;
		$scope.showPokemon = false;
		$scope.pokemon = {};

	  $scope.pkListInit = function(){
      return pkApiFactory.getAll().success(function(data){
				return $scope.pokemons = data;
			});
    };

		$scope.showInfo = function(pokemon){
			console.log('showing info');
			$scope.showPokemon = true;
			$scope.selPokemon = pokemon;
		};

		$scope.hideInfo = function(){
			console.log('hiding info');
			$scope.showPokemon = false;
			$scope.selPokemon = {};
		};

		$scope.caughtPokemon = function(id){
			console.log('caught pokemon: '+ id + '!');
		};

		$scope.setOnBattleBox = function(id){
			console.log('set pokemon: '+ id + ' on battle box!');
		};
	}]
);

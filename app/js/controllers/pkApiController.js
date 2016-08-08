'use strict';

angular.module('appPokedex').controller('pkApiController',
	['$scope', 'pkApiFactory', function($scope, pkApiFactory) {

		$scope.pokemons = [];
		$scope.showActions = false;
		$scope.showPokemon = false;
		$scope.selPokemon = {};
		$scope.searchEntry;
		$scope.orderType = 'order';

		$scope.orderList = function(){
			$scope.orderType = ($scope.orderType.indexOf('-') === -1)? '-' + $scope.orderType : $scope.orderType.replace('-','');
			console.log('reorder the list to: '+$scope.orderType);
		};

	  $scope.pkListInit = function(type){
      return pkApiFactory.getAll(type).success(function(data){
				return $scope.pokemons = data;
			});
    };

		$scope.showInfo = function(pokemon){
			console.log('showing info of pokemon: '+ pokemon.id);
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

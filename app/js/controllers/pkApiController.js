'use strict';

angular.module('appPokedex').controller('pkApiController',
	['$scope', '$log', 'pkApiFactory', function($scope, $log, pkApiFactory) {
		$scope.pokemons = [];
		$scope.showActions = false;
		$scope.showPokemon = false;
		$scope.selPokemon = {};
		$scope.searchEntry = ''; //important: if declared null the filter on main list won't show
		$scope.orderType = 'order';

	  $scope.pkListInit = function(type){
			var pkQuery = null;
			switch (type) {
				case 'caught':
					pkQuery = pkApiFactory.getAll;
					break;
				case 'battle-box':
					pkQuery = pkApiFactory.getAll;
					break;
				default:
					pkQuery = pkApiFactory.getAll;
					break;
			}
      return pkQuery().success(function(data){
				for (var i = 0; i < data.rows.length; i++) {
					pkApiFactory.get(data.rows[i].id).success(function(pokemon){
						$scope.pokemons.push({
							order: pokemon.order,
							_id: pokemon._id,
							name: pokemon.name,
							image: pokemon.image,
							types: pokemon.types
						});
					});
				}
			});
    };

		$scope.pkGet = function(id){
			pkApiFactory.get(id)
				.success(function(data){
					$scope.selPokemon = data;
				})
				.error(function(){
					$log.error('error getting pokemon: '+id);
				});
		};

		$scope.orderList = function(){
			$scope.orderType = ($scope.orderType.indexOf('-') === -1)? '-' + $scope.orderType : $scope.orderType.replace('-','');
		};

		$scope.showInfo = function(id){
			$scope.showPokemon = true;
			return $scope.pkGet(id);
		};

		$scope.hideInfo = function(){
			$scope.showPokemon = false;
			$scope.selPokemon = {};
		};

		$scope.caughtPokemon = function(id){
			$log.info('caught pokemon: '+ id + '!');
		};

		$scope.setOnBattleBox = function(id){
			$log.info('set pokemon: '+ id + ' on battle box!');
		};
	}]
);

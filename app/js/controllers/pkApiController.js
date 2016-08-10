'use strict';

angular.module('appPokedex').controller('pkApiController',
	['$scope', '$log', 'pkApiFactory','pkCaughtFactory', function($scope, $log, pkApiFactory, pkCaughtFactory) {
		$scope.pokemons = [];
		$scope.showActions = false;
		$scope.showPokemon = false;
		$scope.selPokemon = {};
		$scope.searchEntry = ''; //important: if declared null the filter on main list won't show
		$scope.orderType = 'order';

		$scope.pkListPushPokemon = function(pokemon){
				$scope.pokemons.push({
						order: pokemon.order,
						_id: pokemon._id,
						name: pokemon.name,
						image: pokemon.image,
						types: pokemon.types
				});
		};

		$scope.pkListInit = function(){
			return pkApiFactory.getAll().success(function(data){
				for (var i = 0; i < data.rows.length; i++) {
					pkApiFactory.get(data.rows[i].id).success($scope.pkListPushPokemon);
				}
			}).error(function (err) {
				$log.error(err);
			});
		};

		$scope.pkGet = function(id){
			pkApiFactory.get(id).success(function(data){
					$scope.selPokemon = data;
				}).error(function(err){
					$log.error('error getting pokemon: '+id);
					$log.error(err);
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
			pkApiFactory.get(id).success(function(pokemon){
				return pkCaughtFactory.get(id)
					// TODO: fix the update DB method because it duplicate entries
					// .then(function(doc){
					// 	pokemon._rev = doc._rev;
	  			// 	pkCaughtFactory.put(pokemon, doc._rev).then(function(response){
					// 		$log.info('update caught pokemon: '+ id + '!');
					// 	});
					// })
					.catch(function(err){
						delete pokemon._rev;
						pkCaughtFactory.put(pokemon).then(function(){
								$log.info('caught pokemon: '+ id + '!');
						});
					});
			});
		};

		$scope.setOnBattleBox = function(id){
			$log.info('set pokemon: '+ id + ' on battle box!');
		};
	}]
);

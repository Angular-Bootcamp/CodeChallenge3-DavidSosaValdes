'use strict';

angular.module('appPokedex').controller('pkApiController',
	['$scope', '$log', '$rootScope','pkApiFactory','pkCaughtFactory', 'pkBattleBoxFactory', 'Webworker',
		function($scope, $log, $rootScope, pkApiFactory, pkCaughtFactory, pkBattleBoxFactory, Webworker) {
			$scope.caughts = [];
			$scope.battleBox = [];
			$scope.pokemons = [];
			$scope.showActions = false;
			$scope.showPokemon = false;
			$scope.selPokemon = {};
			$scope.searchEntry = ''; //important: if declared null the filter on main list won't show
			$scope.orderType = 'order';

			$scope.setOnLocalCaught = function(pokemonID){
				return pkCaughtFactory.get(pokemonID).then(function(){
					$scope.caughts[pokemonID] = true;
				});
			};

			$scope.setOnLocalBattleBox = function(pokemonID){
				return pkBattleBoxFactory.get(pokemonID).then(function(){
					$scope.battleBox[pokemonID] = true;
				});
			};

			$scope.pkListPushPokemon = function(pokemon){
				return $scope.pokemons.push({
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
						$scope.setOnLocalCaught(data.rows[i].id);
						$scope.setOnLocalBattleBox(data.rows[i].id);
					}
				}).error(function (err) {
					$log.error(err);
				});
			};

			$scope.pkCaughtListInit = function(){
				return pkCaughtFactory.getAll().then(function(result){
					for (var i = 0; i < result.rows.length; i++) {
						pkCaughtFactory.get(result.rows[i].id).then($scope.pkListPushPokemon);
						$scope.setOnLocalCaught(result.rows[i].id);
						$scope.setOnLocalBattleBox(result.rows[i].id);
					}
				});
			};

			$scope.pkBattleBoxListInit = function(){
				return pkBattleBoxFactory.getAll().then(function(result){
					for (var i = 0; i < result.rows.length; i++) {
						pkBattleBoxFactory.get(result.rows[i].id).then($scope.pkListPushPokemon);
						$scope.setOnLocalCaught(result.rows[i].id);
						$scope.setOnLocalBattleBox(result.rows[i].id);
					}
				});
			};

			$scope.pkGet = function(id){
				return pkApiFactory.get(id).success(function(data){
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
				return pkApiFactory.get(id).success(function(pokemon){
					pkCaughtFactory.get(pokemon._id)
					// TODO: fix the update DB method because it duplicates entries
					// .then(function(doc){
					// 	pokemon._rev = doc._rev;
	  			// 	pkCaughtFactory.put(pokemon, doc._rev).then(function(response){
					// 		$log.info('update caught pokemon: '+ id + '!');
					// 	});
					// })
					.catch(function(err){
						delete pokemon._rev;
						pkCaughtFactory.put(pokemon).then(function(){
								$log.info('caught pokemon: '+ pokemon._id + '!');
								$scope.setOnLocalCaught(pokemon._id);
						});
					});
				});
			};

			$scope.setOnBattleBox = function(id){
				pkApiFactory.get(id).success(function(pokemon){
					return pkBattleBoxFactory.get(id)
					// TODO: fix the update DB method because it duplicates entries
					// .then(function(doc){
					// 	pokemon._rev = doc._rev;
	  			// 	pkBattleBoxFactory.put(pokemon, doc._rev).then(function(response){
					// 		$log.info('update caught pokemon: '+ id + '!');
					// 	});
					// })
					.catch(function(err){
						delete pokemon._rev;
						pkBattleBoxFactory.put(pokemon).then(function(){
							$log.info('set pokemon: '+ id + ' on battle box!');
							$scope.setOnLocalBattleBox(pokemon._id);
						});
					});
				});
			};
		}]
	);

'use strict';

angular.module('appPokedex').controller('pkApiController',
	['$scope', '$log', '$rootScope','pkApiFactory','pkCaughtFactory', 'pkBattleBoxFactory', 'Webworker',
		function($scope, $log, $rootScope, pkApiFactory, pkCaughtFactory, pkBattleBoxFactory, Webworker) {
			$scope.pkType = 'all';
			$scope.caughts = [];
			$scope.battleBox = [];
			$scope.pokemons = [];
			$scope.showActions = false;
			$scope.showPokemon = false;
			$scope.selPokemon = {};
			$scope.searchEntry = ''; //important: if declared null the filter on main list won't show
			$scope.orderType = 'order';

			$scope.removeFromPokedex = function(id){
				if ($scope.pkType !== 'all') {
					var pokemons = [];
					for (var i = 0; i < $scope.pokemons.length; i++){
						if ($scope.pokemons[i]._id != id) {
							pokemons.push($scope.pokemons[i]);
						}
					}
					$scope.pokemons = pokemons;
				}
			};

			$scope.removeFromLocalCaught = function(pokemonID){
				return pkCaughtFactory.get(pokemonID).then(function(pokemon){
					return pkCaughtFactory.delete(pokemon).then(function(){
						delete $scope.caughts[pokemonID];
						$scope.removeFromPokedex(pokemonID);
					});
				});
			};

			$scope.removeFromLocalBattleBox = function(pokemonID){
				return pkBattleBoxFactory.get(pokemonID).then(function(pokemon){
					return pkBattleBoxFactory.delete(pokemon).then(function(){
						delete $scope.battleBox[pokemonID];
						$scope.removeFromPokedex(pokemonID);
					});
				});
			};

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
					.then(function(){
						$scope.removeFromLocalCaught(pokemon._id);
						$log.info('delete pokemon: '+pokemon._id+' from the caught list!');
					})
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
				return pkApiFactory.get(id).success(function(pokemon){
					pkBattleBoxFactory.get(pokemon._id)
					.then(function(){
						$scope.removeFromLocalBattleBox(pokemon._id);
						$log.info('delete pokemon: '+pokemon._id+' from the battle-box list!');
					})
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

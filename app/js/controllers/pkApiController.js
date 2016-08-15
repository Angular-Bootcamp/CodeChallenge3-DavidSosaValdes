'use strict';

angular.module('appPokedex').controller('pkApiController',
	['$scope', '$log', 'pkApiFactory','pkCaughtFactory', 'pkBattleBoxFactory',
		function($scope, $log, pkApiFactory, pkCaughtFactory, pkBattleBoxFactory) {

			$scope.caughts = [];
			$scope.battleBox = [];
			$scope.pokemons = [];
			$scope.showActions = false;
			$scope.showPokemon = false;
			$scope.selPokemon = {};
			$scope.searchEntry = ''; //important: if declared null the filter on main list won't show
			$scope.orderType = 'order';
			$scope.pkRemoveOnListMode = false;
			$scope.history = [];

			$scope.getFactory = function(type){
				if (type == 'caught') {
					return pkCaughtFactory;
				}
				else if (type == 'battle-box') {
					return pkBattleBoxFactory;
				}
				else {
					return pkApiFactory;
				}
			};

			$scope.getLocalStorageAttrs = function(type){
				switch (type) {
					case 'battle-box':
						return [pkBattleBoxFactory, $scope.battleBox];
					case 'caught':
						return [pkCaughtFactory, $scope.caughts];
				}
			};

			$scope.insertOnLocalStorage = function(type, id){
				var [database, list] = $scope.getLocalStorageAttrs(type);
				return pkApiFactory.get(id).success(function(pokemon){
					database.get(pokemon._id)
						.then(function(doc){
							$scope.removeFromLocalStorage(type, pokemon._id);
							$log.info('delete pokemon: '+ pokemon._id + ' from the '+ type +' list!');
							// TODO: fix the update DB method because it duplicates entries
							// 	pokemon._rev = doc._rev;
							// 	pkCaughtFactory.put(pokemon, doc._rev).then(function(response){
							// 		$log.info('update caught pokemon: '+ id + '!');
							// 	});
						})
						.catch(function(err){
							delete pokemon._rev;
							database.put(pokemon).then(function(){
									$log.info('set pokemon: '+ pokemon._id + ' on ' + type + ' list!');
									$scope.insertOnLocalList(type, pokemon._id);
							});
						});
				});
			};

			$scope.removeFromLocalStorage = function(type, id){
				var [database, list] = $scope.getLocalStorageAttrs(type);
				return database.get(id).then(function(pokemon){
					database.delete(pokemon).then(function(){
						delete list[id];
						$scope.removeFromPokedex(id);
					});
				});
			};

			$scope.insertOnLocalList = function(type, id){
				var [database, list] = $scope.getLocalStorageAttrs(type);
				return database.get(id).then(function(){
					list[id] = true;
				});
			};

			$scope.updateLocalLists = function(id){
				$scope.insertOnLocalList('caught', id);
				$scope.insertOnLocalList('battle-box', id);
			};

			$scope.removeFromPokedex = function(id){
				for (var i = 0; i < $scope.pokemons.length; i++) {
					if ($scope.pokemons[i]._id == id) {
						$scope.pokemons[i].deleted = $scope.pkRemoveOnListMode;
					}
				}
			};

			$scope.insertPokemon = function(pokemon){
				return $scope.pokemons.push({
						order: pokemon.order,
						_id: pokemon._id,
						name: pokemon.name,
						image: pokemon.image,
						types: pokemon.types,
						deleted: false
				});
			};

			$scope.getPokemon = function(id){
				return pkApiFactory.get(id).success(function(data){
					$scope.selPokemon = data;
				}).error(function(err){
					$log.error('error getting pokemon: '+id);
				});
			};

			$scope.orderList = function(){
				$scope.orderType = ($scope.orderType.indexOf('-') === -1)?
					'-' + $scope.orderType : $scope.orderType.replace('-','');
			};

			$scope.showInfo = function(id){
				$scope.showPokemon = true;
				$scope.history.push($scope.selPokemon._id);
				return $scope.getPokemon(id);
			};

			$scope.hideInfo = function(){
				var historyPkID = $scope.history.pop();
				if (historyPkID) {
					return $scope.getPokemon(historyPkID);
				}
				$scope.showPokemon = false;
				$scope.selPokemon = {};
			};

			$scope.onBattleBox = function(id){
				return ($scope.battleBox[id]);
			};

			$scope.onCaughtList = function(id){
				return ($scope.caughts[id]);
			};

			$scope.setOnBattleBox = function(id){
				return $scope.insertOnLocalStorage('battle-box', id);
			};
			$scope.setOnCaughtList = function(id){
				return $scope.insertOnLocalStorage('caught', id);
			};
		}]
	);

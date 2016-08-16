'use strict';

angular.module('appPokedex').controller('pkDirectiveController',
	['$scope', '$log', 'pkApiFactory','pkCaughtFactory', 'pkBattleBoxFactory',
		function($scope, $log, pkApiFactory, pkCaughtFactory, pkBattleBoxFactory) {

			$scope.caughts = [];
			$scope.battleBox = [];
			$scope.pokemons = [];
      $scope.queryHistory = [];
      $scope.showActions = false;
			$scope.showPokemon = false;
      $scope.removeFromListMode = false;
      $scope.enableLogs = false;
      $scope.selPokemon = {};
			$scope.searchEntry = ''; //important: if declared null the filter on main list won't show
			$scope.orderType = 'order';
			$scope.starters = ['1','4','6'];

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
							// TODO: fix the update DB method because it duplicates entries
							// 	pokemon._rev = doc._rev;
							// 	pkCaughtFactory.put(pokemon, doc._rev).then(function(response){
							// 		$log.info('update caught pokemon: '+ id + '!');
							// 	});
              $scope.removeFromLocalStorage(type, pokemon._id);
						})
						.catch(function(err){
							delete pokemon._rev;
							database.put(pokemon).then(function(){
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
            ($scope.enableLogs) && $log.info('delete pokemon: '+ id + ' from the '+ type +' list!');
					});
				});
			};

			$scope.insertOnLocalList = function(type, id){
				var [database, list] = $scope.getLocalStorageAttrs(type);
				return database.get(id).then(function(){
					list[id] = true;
          ($scope.enableLogs) && $log.info('set pokemon: '+ id + ' on ' + type + ' list!');
				});
			};

			$scope.updateLocalLists = function(id){
				$scope.insertOnLocalList('caught', id);
				$scope.insertOnLocalList('battle-box', id);
			};

			$scope.removeFromPokedex = function(id){
				for (var i = 0; i < $scope.pokemons.length; i++) {
					if ($scope.pokemons[i]._id == id) {
						$scope.pokemons[i].deleted = $scope.removeFromListMode;
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
					data.starter = ($scope.starters.indexOf(data._id) !== -1);
					$scope.selPokemon = data;
				}).error(function(err){
					($scope.enableLogs) && $log.error('error getting pokemon: '+id);
				});
			};

			$scope.orderList = function(){
				$scope.orderType = ($scope.orderType.indexOf('-') === -1)?
					'-' + $scope.orderType : $scope.orderType.replace('-','');
			};

			$scope.showInfo = function(id){
				$scope.showPokemon = true;
				$scope.queryHistory.push($scope.selPokemon._id);
				return $scope.getPokemon(id);
			};

			$scope.hideInfo = function(){
				var pokemonID = $scope.queryHistory.pop();
				if (pokemonID){
					return $scope.getPokemon(pokemonID);
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

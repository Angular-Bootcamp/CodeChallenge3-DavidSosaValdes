'use strict';

/**
 * @ngdoc controller
 * @name appPokedex.controller:pkDirectiveController
 * @requires ng.$scope
 * @requires ng.$log
 * @requires appPokedex.factory:pkApiFactory
 * @requires appPokedex.factory:pkCaughtFactory
 * @requires appPokedex.factory:pkBattleBoxFactory
 * @function
 *
 * @description
 * 	Controller used by every directive of the pokedex, it creates the lists of pokemons
 */
angular.module('appPokedex').controller('pkDirectiveController',
	['$scope', '$log', 'pkApiFactory','pkCaughtFactory', 'pkBattleBoxFactory',
		function($scope, $log, pkApiFactory, pkCaughtFactory, pkBattleBoxFactory) {

			/**
			 * @ngdoc property
			 * @name caughts
			 * @propertyOf appPokedex.controller:pkDirectiveController
			 * @type {Array}
			 * @description Used to keep a list of caught pokemons.
			 */
			$scope.caughts = [];

			/**
			 * @ngdoc property
			 * @name battleBox
			 * @propertyOf appPokedex.controller:pkDirectiveController
			 * @type {Array}
			 * @description Used to keep a list of pokemons in the trainer battle box.
			 */
			$scope.battleBox = [];

			/**
			 * @ngdoc property
			 * @name pokemons
			 * @propertyOf appPokedex.controller:pkDirectiveController
			 * @type {Array}
			 * @description Used to keep a list of caught pokemons.
			 */
			$scope.pokemons = [];

			/**
			 * @ngdoc property
			 * @name queryHistory
			 * @propertyOf appPokedex.controller:pkDirectiveController
			 * @type {Array}
			 * @description Used to keep a history of examined pokemons.
			 */
			$scope.queryHistory = [];

			/**
			 * @ngdoc property
			 * @name showActions
			 * @propertyOf appPokedex.controller:pkDirectiveController
			 * @type {boolean}
			 * @description Flag used by the swipe right event to show the pokemon actions (Caught and Battle Box).
			 */
      $scope.showActions = false;

			/**
			 * @ngdoc property
			 * @name showPokemon
			 * @propertyOf appPokedex.controller:pkDirectiveController
			 * @type {boolean}
			 * @description Flag used to show/hide the pokemon information.
			 */
			$scope.showPokemon = false;

			/**
			 * @ngdoc property
			 * @name removeFromListMode
			 * @propertyOf appPokedex.controller:pkDirectiveController
			 * @type {boolean}
			 * @description
			 * 	Flag used to indicate if a directive want to remove pokemons
			 * 	from the main list ($scope.pokemons).
			 */
      $scope.removeFromListMode = false;

			/**
			 * @ngdoc property
			 * @name enableLogs
			 * @propertyOf appPokedex.controller:pkDirectiveController
			 * @type {boolean}
			 * @description Flag used to show app logs on the console.
			 */
      $scope.enableLogs = false;

			/**
			 * @ngdoc property
			 * @name selPokemon
			 * @propertyOf appPokedex.controller:pkDirectiveController
			 * @type {Object}
			 * @description Object stored to represent the examined pokemon.
			 */
      $scope.selPokemon = {};

			/**
			 * @ngdoc property
			 * @name searchEntry
			 * @propertyOf appPokedex.controller:pkDirectiveController
			 * @type {string}
			 * @description ngModel used to filter the pokemons.
			 * 	Important: if declared null, the filter on the main list won't show the pokemons.
			 */
			$scope.searchEntry = '';

			/**
			 * @ngdoc property
			 * @name orderType
			 * @propertyOf appPokedex.controller:pkDirectiveController
			 * @type {string}
			 * @description Pokedex order flag (default: pokemon number).
			 */
			$scope.orderType = 'order';

			/**
			 * @ngdoc property
			 * @name starters
			 * @propertyOf appPokedex.controller:pkDirectiveController
			 * @type {Array}
			 * @description Starter pokemon IDs of Kanto Region.
			 */
			$scope.starters = ['1','4','6'];

			/**
			 * @ngdoc function
			 * @name getLocalStorageAttrs
			 * @methodOf appPokedex.controller:pkDirectiveController
			 * @requires pkBattleBoxFactory
			 * @requires pkBattleBoxFactory
			 * @requires $scope.battleBox
			 * @requires $scope.caughts
			 * @description Get the localStorage params.
			 * @param {string} type localStorage type (battle-box, caught).
			 * @return {Array} params LocalStorage factory and a list.
			 * @private
			 */
			var getLocalStorageAttrs = function(type){
				switch (type) {
					case 'battle-box':
						return [pkBattleBoxFactory, $scope.battleBox];
					case 'caught':
						return [pkCaughtFactory, $scope.caughts];
				}
			};

			/**
			 * @ngdoc function
			 * @name removeFromPokedex
			 * @methodOf appPokedex.controller:pkDirectiveController
			 * @requires $scope.pokemons
			 * @requires $scope.removeFromListMode
			 * @description Remove a pokemon from the pokedex main list.
			 * @param {string} id Pokemon ID.
			 * @private
			 */
			var removeFromPokedex = function(id){
				for (var i = 0; i < $scope.pokemons.length; i++) {
					if ($scope.pokemons[i]._id == id) {
						$scope.pokemons[i].deleted = $scope.removeFromListMode;
					}
				}
			};

			/**
			 * @ngdoc function
			 * @name removeFromLocalStorage
			 * @methodOf appPokedex.controller:pkDirectiveController
			 * @requires getLocalStorageAttrs
			 * @requires removeFromPokedex
			 * @requires $scope.enableLogs
			 * @requires ng.$log
			 * @description Remove a pokemon from a database.
			 * @param {string} type The localStorage type (battle-box, caught).
			 * @param {string} id Pokemon ID.
			 * @private
			 */
			var removeFromLocalStorage = function(type, id){
				var [database, list] = getLocalStorageAttrs(type);
				return database.get(id).then(function(pokemon){
					database.delete(pokemon).then(function(){
						delete list[id];
						removeFromPokedex(id);
						($scope.enableLogs) && $log.info('delete pokemon: '+ id + ' from the '+ type +' list!');
					});
				});
			};

			/**
			 * @ngdoc function
			 * @name insertOnLocalList
			 * @methodOf appPokedex.controller:pkDirectiveController
			 * @requires getLocalStorageAttrs
			 * @requires $scope.enableLogs
			 * @requires ng.$log
			 * @description Insert a pokemon on a list.
			 * @param {string} type The list type (battle-box, caught).
			 * @param {string} id Pokemon ID.
			 * @private
			 */
			var insertOnLocalList = function(type, id){
				var [database, list] = getLocalStorageAttrs(type);
				return database.get(id).then(function(){
					list[id] = true;
					($scope.enableLogs) && $log.info('set pokemon: '+ id + ' on ' + type + ' list!');
				});
			};

			/**
			 * @ngdoc function
			 * @name insertOnLocalStorage
			 * @methodOf appPokedex.controller:pkDirectiveController
			 * @requires getLocalStorageAttrs
			 * @requires pkApiFactory
			 * @requires removeFromLocalStorage
			 * @requires insertOnLocalList
			 * @description Insert a pokemon on localStorage, removes it from a database if exists.
			 * @param {string} type The localStorage type (battle-box, caught).
			 * @param {string} id Pokemon ID.
			 * @private
			 */
			var insertOnLocalStorage = function(type, id){
				var [database, list] = getLocalStorageAttrs(type);
				return pkApiFactory.get(id).success(function(pokemon){
					database.get(pokemon._id)
						.then(function(doc){
							// TODO: fix the update DB method because it duplicates entries
							// 	pokemon._rev = doc._rev;
							// 	pkCaughtFactory.put(pokemon, doc._rev).then(function(response){
							// 		$log.info('update caught pokemon: '+ id + '!');
							// 	});
							removeFromLocalStorage(type, pokemon._id);
						})
						.catch(function(err){
							delete pokemon._rev;
							database.put(pokemon).then(function(){
									insertOnLocalList(type, pokemon._id);
							});
						});
				});
			};

			/**
			 * @ngdoc function
			 * @name getFactory
			 * @methodOf appPokedex.controller:pkDirectiveController
			 * @description Get a factory.
			 * @param {string} type The factory type name
			 * @return {Object} factory The factory stored on controller
			 */
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

			/**
			 * @ngdoc function
			 * @name updateLocalLists
			 * @methodOf appPokedex.controller:pkDirectiveController
			 * @description Update pokemons on lists based on changes in localStorage.
			 * @param {string} id Pokemon ID
			 */
			$scope.updateLocalLists = function(id){
				insertOnLocalList('caught', id);
				insertOnLocalList('battle-box', id);
			};

			/**
			 * @ngdoc function
			 * @name insertPokemon
			 * @methodOf appPokedex.controller:pkDirectiveController
			 * @description Insert a pokemon object into the main pokemon list ($scope.pokemons).
			 * @param {Object} pokemon Pokemon data
			 */
			$scope.insertPokemon = function(pokemon){
				$scope.pokemons.push({
						order: pokemon.order,
						_id: pokemon._id,
						name: pokemon.name,
						image: pokemon.image,
						types: pokemon.types,
						deleted: false
				});
			};

			/**
			 * @ngdoc function
			 * @name getPokemon
			 * @methodOf appPokedex.controller:pkDirectiveController
			 * @description Get a pokemon full information, also stores it on selPokemon property.
			 * @param {string} type Pokemon ID
			 * @TODO check localStorage if there's not a network connection.
			 */
			$scope.getPokemon = function(id){
				return pkApiFactory.get(id).success(function(data){
					data.starter = ($scope.starters.indexOf(data._id) !== -1);
					$scope.selPokemon = data;
				}).error(function(err){
					($scope.enableLogs) && $log.error('error getting pokemon: '+id);
				});
			};

			/**
			 * @ngdoc function
			 * @name orderList
			 * @methodOf appPokedex.controller:pkDirectiveController
			 * @description Change the order type (asc/desc) based on the current state of the orderType property.
			 */
			$scope.orderList = function(){
				$scope.orderType = ($scope.orderType.indexOf('-') === -1)?
					'-' + $scope.orderType : $scope.orderType.replace('-','');
			};

			/**
			 * @ngdoc function
			 * @name showInfo
			 * @methodOf appPokedex.controller:pkDirectiveController
			 * @description Show the pokemon description info.
			 * @param {string} type Pokemon ID
			 */
			$scope.showInfo = function(id){
				$scope.showPokemon = true;
				$scope.queryHistory.push($scope.selPokemon._id);
				return $scope.getPokemon(id);
			};

			/**
			 * @ngdoc function
			 * @name hideInfo
			 * @methodOf appPokedex.controller:pkDirectiveController
			 * @description Hide the pokemon info window and clear the selPokemon property.
			 * Note: if there's a pokemon ID stored on the history it will show that pokemon instead.
			 */
			$scope.hideInfo = function(){
				var pokemonID = $scope.queryHistory.pop();
				if (pokemonID){
					return $scope.getPokemon(pokemonID);
				}
				$scope.showPokemon = false;
        $scope.selPokemon = {};
			};

			/**
			 * @ngdoc function
			 * @name onBattleBox
			 * @methodOf appPokedex.controller:pkDirectiveController
			 * @requires $scope.battleBox
			 * @description Checks if pokemon is on the battle-box list.
			 * @param {string} id Pokemon ID
			 * @return {boolean} flag The state
			 */
			$scope.onBattleBox = function(id){
				return ($scope.battleBox[id]);
			};

			/**
			 * @ngdoc function
			 * @name onCaughtList
			 * @methodOf appPokedex.controller:pkDirectiveController
			 * @requires $scope.caughts
			 * @description Checks if pokemon is on the caught list.
			 * @param {string} id Pokemon ID
			 * @return {boolean} flag The state
			 */
			$scope.onCaughtList = function(id){
				return ($scope.caughts[id]);
			};

			/**
			 * @ngdoc function
			 * @name setOnBattleBox
			 * @methodOf appPokedex.controller:pkDirectiveController
			 * @requires insertOnLocalStorage
			 * @description Insert a pokemon on the battle-box database.
			 * @param {string} id Pokemon ID
			 */
			$scope.setOnBattleBox = function(id){
				return insertOnLocalStorage('battle-box', id);
			};

			/**
			 * @ngdoc function
			 * @name setOnCaughtList
			 * @methodOf appPokedex.controller:pkDirectiveController
			 * @requires insertOnLocalStorage
			 * @description Insert a pokemon on the caught database.
			 * @param {string} id Pokemon ID
			 */
			$scope.setOnCaughtList = function(id){
				return insertOnLocalStorage('caught', id);
			};
		}]
	);

'use strict';

/**
 * @ngdoc directive
 * @name appPokedex.directive:pkCaughtList
 * @element ANY
 * @function
 *
 * @description Create a list of pokemons stored on the caught localStorage database.
 * @example <pk-caught-list></pk-caught-list>
 **/
angular.module('appPokedex').directive('pkCaughtList', [function(){
	return {
		controller: 'pkDirectiveController',
		templateUrl: 'js/templates/pkList.html',
		link: function(scope, el, attr, ctrl){
			scope.removeFromListMode = true;
			var factory = scope.getFactory('caught');
			factory.getAll().then(function(result){
				for (var i = 0; i < result.rows.length; i++) {
					factory.get(result.rows[i].id).then(scope.insertPokemon);
					scope.updateLocalLists(result.rows[i].id);
				}
			});
		}
	};
}]);

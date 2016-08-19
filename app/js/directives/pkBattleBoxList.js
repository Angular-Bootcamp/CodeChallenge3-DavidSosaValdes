'use strict';

/**
 * @ngdoc directive
 * @name appPokedex.directive:pkBattleboxList
 * @element ANY
 * @function
 *
 * @description Create a list of pokemons stored on the battle-box localStorage database.
 * @example <pk-battlebox-list></pk-battlebox-list>
 **/
angular.module('appPokedex').directive('pkBattleboxList', [function(){
	return {
		controller: 'pkDirectiveController',
		templateUrl: 'js/templates/pkList.html',
		link: function(scope, el, attr, ctrl){
			scope.removeFromListMode = true;
			var factory = scope.getFactory('battle-box');
			factory.getAll().then(function(result){
				for (var i = 0; i < result.rows.length; i++) {
					factory.get(result.rows[i].id).then(scope.insertPokemon);
					scope.updateLocalLists(result.rows[i].id);
				}
			});
		}
	};
}]);

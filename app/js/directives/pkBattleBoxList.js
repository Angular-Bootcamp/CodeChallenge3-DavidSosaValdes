'use strict';

angular.module('appPokedex').directive('pkBattleboxList', [function(){
	return {
		controller: 'pkApiController',
		templateUrl: 'js/templates/pkList.html',
		link: function(scope, el, attr, ctrl){
			scope.pkRemoveOnListMode = true;
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

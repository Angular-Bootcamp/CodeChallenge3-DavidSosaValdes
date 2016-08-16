'use strict';

angular.module('appPokedex').directive('pkList', [function(){
	return {
		controller: 'pkDirectiveController',
		templateUrl: 'js/templates/pkList.html',
		link: function(scope, el, attr, ctrl){
			var factory = scope.getFactory();
			factory.getAll().success(function(data){
				for (var i = 0; i < data.rows.length; i++) {
					factory.get(data.rows[i].id).success(scope.insertPokemon);
					scope.updateLocalLists(data.rows[i].id);
				}
			});
		}
	};
}]);

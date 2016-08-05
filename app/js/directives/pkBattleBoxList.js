'use strict';

angular.module('appPokedex').directive('pkBattleboxList', [function($timeout){
	return {
		controller: 'pkApiController',
		templateUrl: 'js/templates/pkList.html',
		link: function(scope, el, attr, ctrl){
			scope.pkListInit();
		}
	};
}]);

'use strict';

angular.module('appPokedex').directive('pkCaughtList', [function(){
	return {
		controller: 'pkApiController',
		templateUrl: 'js/templates/pkList.html',
		link: function(scope, el, attr, ctrl){
			scope.pkCaughtListInit();
		}
	};
}]);

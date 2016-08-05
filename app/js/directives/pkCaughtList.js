'use strict';

angular.module('appPokedex').directive('pkCaughtList', [function(){
	return {
		scope: {},
		controller: 'pkApiController',
		templateUrl: 'js/templates/pkList.html',
		link: function(scope, el, attr, ctrl){
		}
	};
}]);

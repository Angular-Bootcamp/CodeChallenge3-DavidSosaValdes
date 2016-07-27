'use strict';

angular.module('pkMenu').directive('pkMenu', function() {
	return {
		transclude: true,
		scope: {

		},
		templateUrl: 'modules/pkMenu/pkMenuTemplate.html',
		controller: 'pkMenuController',
		link: function(scope, el, attr) {
			 
		}
	};
});
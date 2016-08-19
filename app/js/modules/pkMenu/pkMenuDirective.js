'use strict';

/**
 * @ngdoc directive
 * @name pkMenu.directive:pkMenu
 * @element ANY
 * @restrict E
 * @description Create a navigation menu bar for the pokedex.
 **/
angular.module('pkMenu').directive('pkMenu', function() {
	return {
		transclude: true,
		templateUrl: 'js/modules/pkMenu/pkMenuTemplate.html',
		controller: 'pkMenuController',
		link: function(scope, el, attr) {}
	};
});

'use strict';

/**
 * @ngdoc directive
 * @name pkMenu.directive:pkMenuItem
 * @restrict E
 * @description Create menu item on the navigation bar.
 * @param {string} label Menu label
 * @param {string} route URL to redirect
 **/
angular.module('pkMenu').directive('pkMenuItem', function() {
	return {
		require: '^pkMenu',
		scope: {
			label: '@',
			route: '@'
		},
		templateUrl: 'js/modules/pkMenu/pkMenuItemTemplate.html',
		link: function(scope, el, attr, ctrl) {
			$(el).click(function(){
					scope.$apply(function(){
						ctrl.setActiveElement(scope.label);
						$('.navbar-toggle').click();
					});
			});
		}
	};
});

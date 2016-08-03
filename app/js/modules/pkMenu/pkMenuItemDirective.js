'use strict';

angular.module('pkMenu').directive('pkMenuItem', function() {
	return {
		require: '^pkMenu',
		scope: {
			label: '@',
			active: '=',
			url: '@'
		},
		templateUrl: 'js/modules/pkMenu/pkMenuItemTemplate.html',
		link: function(scope, el, attr, ctrl) {

		}
	};
});

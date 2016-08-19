'use strict';

/**
 * @ngdoc directive
 * @name pkFramework.directive:pkFramework
 * @element ANY
 * @scope
 * @description Create the main layout of the pokedex.
 * @restrict E
 * @param {string} title Pokedex main title.
 **/
angular.module('pkFramework').directive('pkFramework', function(){
	return {
		transclude: true,
		scope: {
			title: '@'
		},
		controller: 'pkFrameworkController',
		templateUrl: 'js/modules/pkFramework/pkFrameworkTemplate.html'
	};
});

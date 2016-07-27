'use strict';

angular.module('pkFramework').directive('pkFramework', function(){
	return {
		transclude: true,
		scope: {
			title: '@'
		},
		controller: 'pkFrameworkController',
		templateUrl: 'modules/pkFramework/pkFrameworkTemplate.html' 
	};
});
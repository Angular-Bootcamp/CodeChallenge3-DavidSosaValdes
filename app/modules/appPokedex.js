'use strict';

angular.module('appPokedex', ['ngRoute', 'pkFramework'])
	.config(['$routeProvider', function($routeProvider){
		var routes = [
			{
				url: '/caught',
				config: {
					template: '<pk-caught-list></pk-caught-list>'
				}
			},
			{
				url: '/battle-box',
				config: {
					template: '<pk-battlebox-list></pk-battlebox-list>'
				}
			}
		];
		routes.forEach(function(route){
			$routeProvider.when(route.url, route.config);
		});
		//$routeProvider.otherwise({redirectTo: '/404'});
	}]);
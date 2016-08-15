'use strict';

angular.module('pkMenu').controller('pkMenuController', ['$scope', function($scope){
	$scope.activeElement = null;

	this.setActiveElement = function(elementName){
		$scope.activeElement = elementName;
	};
}]);

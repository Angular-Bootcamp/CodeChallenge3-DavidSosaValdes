'use strict';

/**
 * @ngdoc controller
 * @name pkMenu.controller:pkMenuController
 * @requires ng.$scope
 * @function
 *
 * @description
 * 	Controller used by pkFramework module
 */
angular.module('pkMenu').controller('pkMenuController', ['$scope', function($scope){

	/**
	 * @ngdoc property
	 * @name activeElement
	 * @propertyOf pkMenu.controller:pkMenuController
	 * @type {string}
	 * @description Used to keep the current element stored.
	 */
	$scope.activeElement = null;

	/**
	 * @ngdoc function
	 * @name setActiveElement
	 * @methodOf pkMenu.controller:pkMenuController
	 * @requires $scope.activeElement
	 * @description Set the the current menu element.
	 * @param {string} elementName Menu element name.
	 */
	this.setActiveElement = function(elementName){
		$scope.activeElement = elementName;
	};
}]);

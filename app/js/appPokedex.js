'use strict';

angular.module('appPokedex', ['ngRoute','ngTouch','ngAnimate','pouchdb','pkFramework'])
  .config(['$routeProvider', function($routeProvider){
    $routeProvider
      .when('/all',{
        template:'<pk-list></pk-list>'
      })
      .when('/caught', {
        template: '<pk-caught-list></pk-caught-list>'
      })
      .when('/battle-box', {
        template: '<pk-battlebox-list></pk-battlebox-list>'
      })
      .otherwise({
        redirectTo: '/all'
      });
  }]);

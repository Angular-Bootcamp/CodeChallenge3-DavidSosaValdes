'use strict';

angular.module('appPokedex').factory('pkApiFactory', function($http){
  return {
    url: '../data/pokedex.json',
    getAll: function(){
      return $http.get((this.url));
    }
  };
});

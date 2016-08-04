'use strict';

angular.module('appPokedex').factory('pkApiFactory', function($http){
  return {
    url: 'http://pokeapi.co/api/v2',
    populate: function(){
      var pokemons = [];
      $http.get((this.url+'/pokemon/?limit=5')).success(function(data){
        for (var i = 0; i < data.results.length; i++) {
          $http.get(data.results[i].url).success(function(data){
              pokemons.push({
                id: data.id,
                name: data.name,
                sprites: data.sprites,
                order: data.order
              });
          });
        }
      });
      return pokemons;
    }
  };
});

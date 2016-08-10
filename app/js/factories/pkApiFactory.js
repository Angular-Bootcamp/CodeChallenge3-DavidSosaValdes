'use strict';

// Convert an image on base64 to store as a string on database
function convertImage(url, callback){
  var xhr = new XMLHttpRequest();
  xhr.responseType = 'blob';
  xhr.onload = function() {
    var reader  = new FileReader();
    reader.onloadend = function () {
      callback(reader.result);
    };
    reader.readAsDataURL(xhr.response);
  };
  xhr.open('GET', '//cors-anywhere.herokuapp.com/'+url);
  xhr.send();
}

angular.module('appPokedex').factory('pkApiFactory', function($http, $log){
  var API_URL = 'http://pokeapi.co';
  var DATABASE_URL = 'http://127.0.0.1:5984/pokedex';
  return {
    get: function(id){
      return $http.get((DATABASE_URL+'/'+id));
    },
    getAll: function(callback){
      return $http.get((DATABASE_URL+'/_all_docs'));
    },
    populateDB: function(min, max) {
      var json = [];
      for (var i = min; i <= max; i++) {
        // Get pokemon basic information
        $http.get((API_URL + '/api/v2/pokemon/'+i))
          .success(function(data){
            convertImage(data.sprites.front_default, function(base64Img){
              var pokemon = {
                _id        : data.id.toString(), // _id field must contain a string
                name       : data.name,
                image      : base64Img,
                order      : data.order,
                abilities  : data.abilities,
                stats      : data.stats,
                types      : data.types,
                weight     : data.weight,
                height     : data.height,
                region     : "Kanto",
                evolutions : []
              };
              // Get location area encounters
              $http.get((API_URL + data.location_area_encounters))
                .success(function(data){
                  pokemon.locations = data;
                  // Get evolutions
                  $http.get((API_URL + '/v2/evolution-chain/' + pokemon._id))
                    .success(function(data){
                      var evolutions = new Promise(function(resolve, reject) {
                        for (var evolution in data.chain) {
                          var _cur_evolution = null;
                          while ((_cur_evolution = evolution.evolves_to)) {
                              $http.get(_cur_evolution.species.url)
                              .success(function(response){
                                pokemon.evolutions.push({
                                  id: response.id,
                                  name: response.name
                                });
                              })
                              .error(function(response, status){
                                $log.error('Evolution Chain error', status, response);
                              });
                              evolution = _cur_evolution;
                          }
                        }
                      });
                      evolutions.then(function(){
                        json.push(pokemon);
                        (json.length >= max) && $log.info(JSON.stringify(json));
                        $log.info('Success API request of pokemon: '+ pokemon.name);
                      });
                    })
                    .error(function(response, status){
                      $log.error('Evolutions error', status, response);
                    });
                })
                .error(function(response, status){
                  $log.error('Locations error', status, response);
                });
            });
        })
        .error(function(data, status){
          $log.error('Repos error', status, data);
        });
      }
    }
  };
});

'use strict';

angular.module('appPokedex').factory('pkApiFactory', function($http){
  // Convert an image on base64 to store as a string on database
  var convertImage = function(url, callback){
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'blob';
    xhr.onload = function() {
      var reader  = new FileReader();
      reader.onloadend = function () {
        callback(reader.result);
      }
      reader.readAsDataURL(xhr.response);
    };
    xhr.open('GET', '//cors-anywhere.herokuapp.com/'+url);
    xhr.send();
  };
  return {
    url: '../data/pokedex-full.json',
    getAll: function(type){
      return $http.get((this.url));
    },
    populateDB: function(min, max) {
      var json = [];
      for (var i = min; i <= max; i++) {
        // Get pokemon basic information
        $http.get('http://pokeapi.co/api/v2/pokemon/'+i)
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
                //locations  : []
              };
              // Get location area encounters
              $http.get('http://pokeapi.co'+ data.location_area_encounters)
                .success(function(data){
                  pokemon.locations = data;
                  // Get evolutions
                  $http.get('http://pokeapi.co/api/v2/evolution-chain/'+pokemon._id)
                    .success(function(data){
                      var evolutions = new Promise(function(resolve, reject) {
                        for (var evolution in data.chain) {
                          var _cur_evolution = null;
                          while (_cur_evolution = evolution.evolves_to) {
                              $http.get(_cur_evolution.species.url)
                              .success(function(response){
                                pokemon.evolutions.push({
                                  id: response.id,
                                  name: response.name
                                });
                              })
                              .error(function(response, status){
                                console.error('Evolution Chain error', status, response);
                              });
                              evolution = _cur_evolution;
                          }
                        }
                      });
                      evolutions.then(function(){
                        json.push(pokemon);
                        (json.length >= max) && console.log(JSON.stringify(json));
                        console.log('Success API request of pokemon: '+ pokemon.name);
                      });
                    })
                    .error(function(response, status){
                      console.error('Evolutions error', status, response);
                    });
                })
                .error(function(response, status){
                  console.error('Locations error', status, response);
                });
            });
        })
        .error(function(data, status){
          console.error('Repos error', status, data);
        });
      }
      return json;
    }
  };
});

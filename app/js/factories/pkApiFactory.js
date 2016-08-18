'use strict';

/**
 * @ngdoc service
 * @name appPokedex.factory:pkApiFactory
 * @function

 * @description
 *  Query the pokemons from a local server (CouchDB).
 */
angular.module('appPokedex').factory('pkApiFactory', function($http, $log){
  /** @global */
  var API_URL = 'http://pokeapi.co';
  /** @global */
  var DATABASE_URL = 'http://127.0.0.1:5984/pokedex';
  /** @function convertImage */
  var convertImage = function(url, callback){
    //Convert an image on base64 to store as a string on database
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
  };
  return {
    /**
     * @ngdoc property
     * @name get
     * @propertyOf appPokedex.factory:pkApiFactory
     * @description
     *  Get a single doc using a pokemon ID as a param
     * @param {string} id Pokemon ID
     * @returns {Object} $http promise
     */
    get: function(id){
      return $http.get((DATABASE_URL+'/'+id));
    },
    /**
     * @ngdoc property
     * @name getAll
     * @propertyOf appPokedex.factory:pkApiFactory
     * @description
     *  Get all docs stored on the DB (without information, only the ids)
     * @returns {object} $http promise
     */
    getAll: function(){
      return $http.get((DATABASE_URL+'/_all_docs'));
    },
    /**
     * @ngdoc property
     * @name populateDB
     * @propertyOf appPokedex.factory:pkApiFactory
     * @description
     *  Populate local database from the pokeapi
     * @param {integer} min min pokemon limit
     * @param {integer} max max pokemon limit
     * @returns {Object} pokedex an array of pokemons data
     */
    populateDB: function(min, max){
      var json = [];
      for (var i = min; i <= max; i++){
        // Get pokemon basic information
        $http.get((API_URL + '/api/v2/pokemon/'+i))
          .success(function(data){
            convertImage(data.sprites.front_default, function(base64Img){
              var pokemon = {
                _id         : data.id.toString(), // _id field must contain a string
                name        : data.name,
                image       : base64Img,
                order       : data.order,
                abilities   : data.abilities,
                stats       : data.stats,
                types       : data.types,
                weight      : data.weight,
                height      : data.height,
                region      : "Kanto",
                evolutions  : [],
                locations   : [],
                description : ''
              };
              // Get description
              $http.get(data.species.url).success(function(data){
                pokemon.description = data.flavor_text_entries[1].flavor_text;
                // Get location area encounters
                $http.get((API_URL + data.location_area_encounters))
                  .success(function(data){
                    pokemon.locations = data;
                    // Get evolutions
                    $http.get((API_URL + '/api/v2/evolution-chain/' + pokemon._id))
                      .success(function(data){
                        var getEvolutions = function(chain, evolutions, callback){
                          if (typeof chain.evolves_to[0] !== 'undefined') {
                            $http.get(chain.evolves_to[0].species.url)
                              .success(function(response){
                                evolutions.push({
                                  id: response.id,
                                  name: response.name
                                });
                                return getEvolutions(chain.evolves_to[0], evolutions, callback);
                              });
                          }
                          else {
                            return callback(evolutions);
                          }
                        };
                        getEvolutions(data.chain, [], function(data){
                          pokemon.evolutions = data;
                          json.push(pokemon);
                          $log.info('Success API request of pokemon: '+ pokemon.name);
                          if (json.length >= max) {
                            /* Here we can push to the server, instead we log the information for testing purposes */
                            var output = JSON.stringify(json);
                            $log.info(output);
                          }
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
            });
        })
        .error(function(data, status){
          $log.error('Repos error', status, data);
        });
      }
    }
  };
});

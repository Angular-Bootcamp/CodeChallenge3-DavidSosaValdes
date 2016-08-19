'use strict';

 /**
  * @ngdoc service
  * @name appPokedex.factory:pkCaughtFactory
  * @description Query the pokemons saved in the caught list(indexDB) using pouchDB.
  * @requires ng.$log
  * @requires pouchDB
  */
angular.module('appPokedex').factory('pkCaughtFactory', function($log, pouchDB){
  /**
   * @ngdoc property
   * @name DB
   * @propertyOf appPokedex.factory:pkCaughtFactory
   * @type {Object}
   * @description Used to connect to the caught list localStorage.
   * @private
   */
  var DB = pouchDB('pkCaughtDB');
  return {
    /**
     * @ngdoc function
     * @name get
     * @methodOf appPokedex.factory:pkCaughtFactory
     * @description Get a single doc using a pokemon ID as a param
     * @param {string} id Pokemon ID
     * @returns {Object} GET pouchDB promise
    */
    get: function(id){
      return DB.get(id);
    },
    /**
     * @ngdoc function
     * @name getAll
     * @methodOf appPokedex.factory:pkCaughtFactory
     * @description Get all docs stored on the DB (without information, only the ids)
     * @returns {Object} GET pouchDB promise
     */
    getAll: function(){
      return DB.allDocs();
    },
    /**
     * @ngdoc function
     * @name put
     * @methodOf appPokedex.factory:pkCaughtFactory
     * @description Store/Update a pokemon data on the DB
     * @param {Object} data Pokemon data
     * @returns {Object} GET pouchDB promise
     */
    put: function(data){
      return DB.put(data);
    },
    /**
     * @ngdoc function
     * @name delete
     * @methodOf appPokedex.factory:pkCaughtFactory
     * @description Delete a pokemon from the DB
     * @param {string} id Pokemon ID
     * @returns {Object} GET pouchDB promise
     */
    delete: function(id){
      return DB.remove(id);
    }
  };
});

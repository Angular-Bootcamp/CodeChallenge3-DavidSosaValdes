'use strict';

 /**
  * @ngdoc service
  * @name appPokedex.factory:pkBattleBoxFactory
  * @function
  *
  * @description
  *  Query the pokemons saved in the battle-box(indexDB) using pouchDB.
  */
angular.module('appPokedex').factory('pkBattleBoxFactory', function($log, pouchDB){
  /** @global */
  var DB = pouchDB('pkBattleBoxDB');
  return {
    /**
     * @ngdoc property
     * @name get
     * @propertyOf appPokedex.factory:pkBattleBoxFactory
     * @description
     *  Get a single doc using a pokemon ID as a param
     * @param {string} id Pokemon ID
     * @returns {Object} $http promise
    */
    get: function(id){
      return DB.get(id);
    },
    /**
     * @ngdoc property
     * @name getAll
     * @propertyOf appPokedex.factory:pkBattleBoxFactory
     * @description
     *  Get all docs stored on the DB (without information, only the ids)
     * @returns {object} $http promise
     */
    getAll: function(){
      return DB.allDocs();
    },
    /**
     * @ngdoc property
     * @name getAll
     * @propertyOf appPokedex.factory:pkBattleBoxFactory
     * @description
     *  Store/Update a pokemon data on the DB
     * @returns {object} $http promise
     */
    put: function(data){
      return DB.put(data);
    },
    /**
     * @ngdoc property
     * @name getAll
     * @propertyOf appPokedex.factory:pkBattleBoxFactory
     * @description
     *  Delete a pokemon from the DB
     * @returns {object} $http promise
     */
    delete: function(id){
      return DB.remove(id);
    }
  };
});

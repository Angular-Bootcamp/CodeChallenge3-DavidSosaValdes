'use strict';

angular.module('appPokedex').factory('pkBattleBoxFactory', function($log, pouchDB){
  var DB = pouchDB('pkBattleBoxDB');
  return {
    get: function(id){
      return DB.get(id);
    },
    getAll: function(){
      return DB.allDocs();
    },
    put: function(data){
      return DB.put(data);
    },
    delete: function(id){
      return DB.remove(id);
    }
  };
});

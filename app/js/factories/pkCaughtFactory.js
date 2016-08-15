'use strict';

angular.module('appPokedex').factory('pkCaughtFactory', function($log, pouchDB){
  var DB = pouchDB('pkCaughtDB');
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

'use strict';

angular.module('appPokedex').factory('pkCaughtFactory', function($log){
  var DB = new PouchDB('pkCaughtDB');
  return {
    get: function(id){
      return DB.get(id);
    },
    getAll: function(){
      return DB.allDocs();
    },
    put: function(data){
      return DB.put(data);
    }
  };
});

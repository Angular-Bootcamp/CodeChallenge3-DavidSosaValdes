'use strict';

angular.module('appPokedex').directive('pkBattleboxList', [function(){
	return {
		controller: 'pkApiController',
		templateUrl: 'js/templates/pkList.html',
		link: function(scope, el, attr, ctrl){
			scope.pkType = 'battle-box';
			scope.pkBattleBoxListInit();
		}
	};
}]);

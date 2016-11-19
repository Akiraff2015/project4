(function() {
	var app = angular.module('InventoryApp');

	app.controller('SingleBoardController', ['$scope', '$http', function($scope, $http) {
		var tempArrUrl = window.location.href.split('/');
		var getId = tempArrUrl[tempArrUrl.length-1];

		$scope.singleBoard = {};

		$scope.getSingleBoard = function() {
			$http.get('/api/board/' + getId).then(function(res) {
				$scope.singleBoard = res.data;
				console.log($scope.singleBoard);
			});
		};

		$scope.getSingleBoard();

	}]);
})();
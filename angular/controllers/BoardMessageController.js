(function() {
	var app = angular.module('InventoryApp');

	app.controller('BoardMessageController', ['$scope', '$http', function($scope, $http) {
		$scope.board = {};

		$scope.addNewBoardMessage = function(newBoard) {
			$http({
				method: 'POST',
				url: '/api/board',
				data: newBoard
			}).then(function successCallback(res) {
				$scope.board = {};
			}, function errorCallback(res) {});
		}
	}]);
})();
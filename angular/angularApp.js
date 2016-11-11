(function() {
	var app = angular.module("InventoryApp", ['ngResource']);

	app.controller("InventoryController", ['$scope', '$http', function($scope, $http) {
		$scope.items = [];
		$scope.item = {};
		$scope.itemToUpdate = {};

		$scope.hideForm = true;
		$scope.editing = false;

		var getItems = function () {
			$http.get('/api/items').success(function(data) {
				$scope.items = data;
			});
		}

		$scope.addItem = function(item) {
			console.log(item);
			$http({
				method: 'POST',
				url: '/api/item',
				data: item
			}).then(function successCallback(res) {
				console.log("Item created!");
				$scope.item = {};
				getItems();
			}, function errorCallback(res) {
				getItems();
			});
		};

		$scope.updateItem = function(item, index) {
			var itemId = $scope.items[index]._id;
			stringifyItem = JSON.stringify(item);

			$http({
				method: 'PUT',
				url: '/api/item/' + itemId,
				data: item

			}).then(function successCallback(res) {
				$scope.item = {};
				console.log("Error updating item!");
				getItems();

			}, function errorCallback(res) {
				console.log(res);
				getItems();
			});
		}

		$scope.deleteItem = function(item) {
			var itemId = item._id;

			$http({
				method: 'DELETE',
				url: '/api/item/' + itemId
			}).then(function successCallback(res) {
				getItems();

			}, function errorCallback(res) {
				getItems();
			});
		};

		getItems();
	}]);
})();
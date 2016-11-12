(function() {
	var app = angular.module("InventoryApp", ['ngResource']);


	app.factory('InventoryFactory', ['$http', function($http) {
		var itemsData = function() {
			return $http.get('/api/items').then(function(res) {
				return res.data;
			});
		};

		return {
			data: itemsData
		};
	}]);

	app.controller("InventoryController", ['$scope', '$http', 'InventoryFactory', function($scope, $http, InventoryFactory) {
		$scope.items = [];
		$scope.item = {};
		$scope.itemToUpdate = {};

		$scope.hideForm = true;
		$scope.editing = false;

		var getItems = function(){
			InventoryFactory.data().then(function(res) {
				$scope.items = res;
			});
		}

		$scope.addItem = function(item) {
			$http({
				method: 'POST',
				url: '/api/item',
				data: item
			}).then(function successCallback(res) {
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
				getItems();

			}, function errorCallback(res) {
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
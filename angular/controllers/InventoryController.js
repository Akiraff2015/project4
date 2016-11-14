(function() {
	var app = angular.module('InventoryApp');

	app.controller('InventoryController', ['$scope', '$http', 'InventoryFactory', function($scope, $http, InventoryFactory) {
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

		$scope.decrementQuantity = function(item, index) {
			var itemId = $scope.items[index]._id;
			var updateQuantity = {
				title: $scope.items[index].title,
				quantity: $scope.items[index].quantity - 1,
				description: $scope.items[index].description
			};

			$http({
				method: 'PUT',
				url: '/api/item/' + itemId,
				data: updateQuantity
			}).then(function successCallback(res) {
				getItems();
			}, function errorCallback(res) {
				getItems();
			});
		};

		$scope.incrementQuantity = function(item, index) {
			var itemId = $scope.items[index]._id;
			var updateQuantity = {
				title: $scope.items[index].title,
				quantity: $scope.items[index].quantity + 1,
				description: $scope.items[index].description
			};

			$http({
				method: 'PUT',
				url: '/api/item/' + itemId,
				data: updateQuantity
			}).then(function successCallback(res) {
				getItems();
			}, function errorCallback(res) {
				getItems();
			});
		};

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
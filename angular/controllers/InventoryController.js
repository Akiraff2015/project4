(function() {
	var app = angular.module('InventoryApp');

	app.controller('InventoryController', ['$scope', '$http', 'InventoryFactory', function($scope, $http, InventoryFactory) {
		$scope.items = [];
		$scope.item = {};
		$scope.getSingleItem = {};

		var myChart;

		$scope.hideForm = true;
		$scope.editing = false;

		var getItems = function(){
			InventoryFactory.itemsData().then(function(res) {
				$scope.items = res;
			});
		}

		$scope.initModal = function(item, index) {
			$scope.getSingleItem = item;
			var formatDate = [];

			$('.modal').modal();

			angular.element(document).ready(function() {
				var ctx = document.getElementById('lineGraph').getContext('2d');

				InventoryFactory.itemsData().then(function(res) {
					res[index].dateUpdated.forEach(function(element, index, arr) {
						formatDate.push(moment(element).format('MM/D [at] h:mm A z'));
					});

					myChart = new Chart(ctx, {
						type: 'line',
						data: {
							labels: formatDate,
							datasets: [{
							label: 'Available Stocks: ' + res[index].quantity[res[index].quantity.length - 1],
							data: res[index].quantity,
							backgroundColor: 'rgba(76,175,80, 0.60)'
						}]
					},
						options: {
							responsive: false,
							scales: {
								yAxes: [{
									ticks: {
										beginAtZero:true
									}
								}]
							}
						}
					});
				});
			});
		};

		$scope.closeModal = function() {
			$('.modal').modal('close');
		};

		$scope.decrementQuantity = function(item) {
			var getItemId = item._id;

			// Get last index and -1
			var quantityLength = item.quantity[item.quantity.length - 1];
			var decQuantity = quantityLength - 1;

			var updateQuantityObj = {
				title: item.title,
				quantity: decQuantity,
				description: item.description,
				dateCreated: item.dateCreated,
				dateUpdated: new Date()
			};

			$http({
				method: 'PUT',
				url: '/api/item/' + getItemId,
				data: updateQuantityObj
			}).then(function successCallback(res) {
				getItems();
			}, function errorCallback(res) {
				getItems();
			});
		};

		$scope.incrementQuantity = function(item) {
			var getItemId = item._id;

			//Get last index and +1
			var quantityLength = item.quantity[item.quantity.length - 1];
			var incQuantity = quantityLength + 1;

			var updateQuantityObj = {
				title: item.title,
				quantity: incQuantity,
				description: item.description,
				dateCreated: item.dateCreated,
				dateUpdated: new Date()
			};

			$http({
				method: 'PUT',
				url: '/api/item/' + getItemId,
				data: updateQuantityObj
			}).then(function successCallback(res) {
				getItems();

			}, function errorCallback(res) {
				getItems();
			});
		};

		$scope.addItem = function(item) {
			var newItemObj = {
				title: item.title,
				quantity: item.quantity,
				description: item.description,
				dateCreated: new Date(),
				dateUpdated: new Date()
			};

			$http({
				method: 'POST',
				url: '/api/item',
				data: newItemObj
			}).then(function successCallback(res) {
				$scope.item = {};
				getItems();
			}, function errorCallback(res) {
				getItems();
			});
		};

		$scope.updateItem = function(item) {
			var getItemId = item._id;

			var updateItemObj = {
				title: item.title,
				quantity: item.quantity,
				description: item.description,
				dateCreated: item.dateCreated,
				dateUpdated: new Date()
			};

			$http({
				method: 'PUT',
				url: '/api/item/' + getItemId,
				data: updateItemObj

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
(function() {
	var app = angular.module('InventoryApp');

	app.controller('OrderController', ['$scope', '$http', function($scope, $http) {
		$scope.itemsForm = [{id: 1}];
		$scope.idCounter = 1;
		$scope.getOrders = [];

		var getAllOrders = function() {
			$http.get('/api/orders').then(function(res) {
				$scope.getOrders = res.data;
			});
		};

		$scope.initModal = function() {
			$('.modal').modal();
		};

		$scope.closeModal = function() {
			$('.modal').modal('close');
		};

		$scope.createNewForm = function() {
			$scope.itemsForm.push({id: $scope.idCounter});
		}

		$scope.removeInputField = function(index) {
			$scope.itemsForm.splice(index, 1);
		};

		$scope.createOrder = function(order) {
			var tempItemArr = [];
			var totalPrice = 0;

			$.each(order.item, function(key, value) {
				tempItemArr.push(value);
				totalPrice += value.price * value.quantity;
			});

			var newOrderObj = {
				orderRef: order.orderRef,
				order: tempItemArr,
				totalPrice: totalPrice.toFixed(2),
				orderConfirmed: false,
				dateCreated: new Date(),
				dateUpdated: new Date()
			};

			$http({
				method: 'POST',
				url: '/api/order',
				data: newOrderObj
			}).then(function successCallback(res) {
				getAllOrders();
			}, function errorCallback(res) {
				getAllOrders();
			});
		};

	}]);
})();
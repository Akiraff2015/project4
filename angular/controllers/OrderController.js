(function() {
	var app = angular.module('InventoryApp');

	app.controller('OrderController', ['$scope', '$http', function($scope, $http) {
		$scope.itemsForm = [{id: 1}];
		$scope.idCounter = 1;
		$scope.getOrders = [];
		$scope.formatDate = [];
		$scope.getSingleOrder = {};

		var getAllOrders = function() {
			$http.get('/api/orders').then(function(res) {
				$scope.getOrders = res.data;

				$scope.getOrders.forEach(function(element, index, arr) {
					$scope.formatDate.push(moment(element.dateCreated).format('DD MMM YYYY'));
				});
			});
		};

		$scope.initModal = function(order) {
			$scope.getSingleOrder = order;
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

		$scope.updateOrderStatus = function(order) {
			var getOrderId = order._id;
			var updateOrderStatus = !order.orderConfirmed;

			var updateOrderObj = {
				orderRef: order.orderRef,
				order: order.order,
				totalPrice: order.totalPrice,
				orderConfirmed: updateOrderStatus,
				dateCreated: order.dateCreated,
				dateUpdated: order.dateUpdated
			};

			$http({
				method: 'PUT',
				url: '/api/order/' + getOrderId,
				data: updateOrderObj
			}).then(function successCallback(res) {
				getAllOrders();
			}, function errorCallback(res) {
				getAllOrders();
			});
		};

		getAllOrders();

	}]);
})();
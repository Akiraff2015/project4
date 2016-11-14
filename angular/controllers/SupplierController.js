(function() {
	var app = angular.module('InventoryApp');

	app.controller('SupplierController', ['$scope', '$http', function($scope, $http) {
		$scope.supplier = {};

		$scope.name = "name";

		$scope.addNewSupplier = function(newSupplier) {
			$http({
				method: 'POST',
				url: '/api/supplier',
				data: newSupplier
			}).then(function successCallback(res) {
				$scope.supplier = {};
			}, function errorCallback(res){});
		}
	}]);
})();
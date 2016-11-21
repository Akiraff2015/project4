(function() {
	var app = angular.module('InventoryApp');

	app.factory('InventoryFactory', ['$http', function($http) {
		var itemsData = function() {
			return $http.get('/api/items').then(function(res) {
				return res.data;
			});
		};

		var boardsData = function() {
			return $http.get('/api/boards').then(function(res) {
				return res.data;
			});
		}

		return {
			itemsData: itemsData,
			boardsData: boardsData
		};
	}]);
})();
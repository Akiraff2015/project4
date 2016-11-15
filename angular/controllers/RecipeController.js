(function() {
	var app = angular.module('InventoryApp');

	app.controller('RecipeController', ['$scope', '$http', function($scope, $http) {
		$scope.showForm = false;
		$scope.idCounter = 1;
		$scope.ingredientsForm = [{id: 1}];

		$scope.createNewInputField = function() {
			$scope.ingredientsForm.push({id: $scope.idCounter++});
		}

		$scope.removeInputField = function (index) {
			$scope.ingredientsForm.splice(index, 1);
		}

		$scope.createRecipe = function(newRecipe) {
			console.log(newRecipe);
		}
	}]);
})();
(function() {
	var app = angular.module('InventoryApp');

	app.controller('RecipeController', ['$scope', '$http', function($scope, $http) {
		$scope.showForm = false;
		
		// Ingredients
		$scope.idCounter = 1;
		$scope.ingredientsForm = [{id: 1}];
		var getIngredient = [];

		$scope.createNewInputField = function() {
			$scope.ingredientsForm.push({id: ++$scope.idCounter});
		}

		$scope.removeInputField = function (index) {
			$scope.ingredientsForm.splice(index, 1);
		}

		$scope.createRecipe = function(newRecipe) {
			$scope.ingredientsForm.forEach(function(element, index) {
				getIngredient.push(element.name);
			});

			newRecipe["ingredients"] = getIngredient;

			$http({
				method: 'POST',
				url: '/api/recipe',
				data: newRecipe
			}).then(function successCallback(res) {},
			function errorCallback(res) {});
		}
	}]);
})();
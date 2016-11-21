(function() {
	const app = angular.module("InventoryApp", ['ngResource', 'ngTagsInput']);

	app.directive('repeatDone', function() {
		return function(scope, element, attrs) {
			if (scope.$last) {
				scope.$eval(attrs.repeatDone);
			}
		}
	});
})();
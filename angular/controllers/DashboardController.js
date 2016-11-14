(function() {
	var app = angular.module('InventoryApp');

	app.controller('DashboardController', ['$scope', '$http', 'InventoryFactory', function($scope, $http, InventoryFactory) {
		$scope.boardMessages = [];

		var getBoardMessages = function() {
			InventoryFactory.boardsData().then(function(res) {
				$scope.boardMessages = res;
			});
		};

		$scope.markRead = function (boardMessage) {
			var boardId = boardMessage._id;
			var updateMarkRead = !boardMessage.read;

			console.log(updateMarkRead);

			var updateBoardMessage = {
				title: boardMessage.title,
				importance: boardMessage.importance,
				description: boardMessage.description,
				read: updateMarkRead,
				dateCreated: boardMessage.dateCreated,
				dateUpdated: boardMessage.dateUpdated
			};

			$http({
				method: 'PUT',
				url: '/api/board/' + boardId,
				data: updateBoardMessage
			}).then(function successCallback(res) {
				getBoardMessages();
			}, function errorCallback(res) {
				getBoardMessages();
			});
		};

		getBoardMessages();
	}]);
})();
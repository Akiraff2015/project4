(function() {
	var app = angular.module('InventoryApp');

	app.controller('DashboardController', ['$scope', '$http', 'InventoryFactory', function($scope, $http, InventoryFactory) {
		$scope.boardMessages = [];


		var getBoardMessages = function() {
			InventoryFactory.boardsData().then(function(res) {
				$scope.boardMessages = res;
			});
		};

		//Add class, ensure the collapsible does not trigger the event
		$scope.addClass = function() {
			$('.disableCollapsible').addClass('disabled');
		};

		$scope.removeClass = function () {
			$('.disableCollapsible').removeClass('disabled');
		};

		$scope.initCommentModal = function(board) {
			$scope.localTitle = board.title;
			$('#commentModal').modal();
		};

		$scope.closeCommentModal = function() {
			$('#commentModal').modal('close');
		};

		$scope.replyComment = function(comment, board) {
			var getBoardId = board._id;

			var createCommentObj = {
				comment: comment.comment,
				dateCreated: new Date()
			}

			$('#commentModal').modal('close');
			// Creates a comment
			$http({
				method: 'POST',
				url: '/api/comment',
				data: createCommentObj

			}).then(function successCallback(res) {
				comment = {};
				// Fetches the most recent comment
				$http.get('/api/newest-comment').then(function(res) {
					var getData = res.data;

					var addCommentData = {
						title: board.title,
						importance: board.importance,
						description: board.description,
						read: board.read,
						comments: getData._id,
						like: board.like,
						likeBoolean: board.likeBoolean,
						dateCreated: board.dateCreated,
						dateUpdated: board.dateUpdated
					};

					$http({
						method: 'PUT',
						url: '/api/board/' + getBoardId,
						data: addCommentData
					}).then(function successCallback(res) {
						getBoardMessages();

					}, function errorCallback(res) {
						getBoardMessages();
					});
				});

			}, function errorCallback(res) {
				getBoardMessages();
			});
		};

		$scope.likeButton = function(boardMessage, index) {
			var boardId = boardMessage._id;
			var likeStatus = !boardMessage.likeBoolean;
			var updateBoardMessage = {};

			// Dislike status
			if (boardMessage.likeBoolean) {
				updateBoardMessage = {
					title: boardMessage.title,
					importance: boardMessage.importance,
					description: boardMessage.description,
					read: boardMessage.read,
					like: boardMessage.like - 1,
					likeBoolean: likeStatus
				};
			}

			// Like status
			else {
				updateBoardMessage = {
					title: boardMessage.title,
					importance: boardMessage.importance,
					description: boardMessage.description,
					read: boardMessage.read,
					like: boardMessage.like + 1,
					likeBoolean: likeStatus
				};
			}

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

		$scope.markRead = function (boardMessage) {
			var boardId = boardMessage._id;
			var updateMarkRead = !boardMessage.read;

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
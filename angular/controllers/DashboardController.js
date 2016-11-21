(function() {
	var app = angular.module('InventoryApp');

	app.controller('DashboardController', ['$scope', '$http', 'InventoryFactory', function($scope, $http, InventoryFactory) {
		$scope.boardMessages = [];
		var getSingleBoard = {};

		var getBoardMessages = function() {
			InventoryFactory.boardsData().then(function(res) {
				$scope.boardMessages = res;
			});
		};

		$scope.getBoard = function(board) {
			getSingleBoard = board;
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

		$scope.replyComment = function(comment) {
			var getBoardId = getSingleBoard._id;
			console.log(getBoardId);

			var createCommentObj = {
				comment: comment.comment,
				like: 0,
				likeBoolean: false,
				dateCreated: new Date(),
				dateUpdated: new Date()
			}

			// Creates a comment
			$http({
				method: 'POST',
				url: '/api/comment',
				data: createCommentObj

			//Comment successful callback
			}).then(function successCallback(res) {
				// HTTP GET /api/newest-comment
				$http.get('/api/newest-comment').then(function(res) {
					var getData = res.data;

					var addCommentData = {
						title: getSingleBoard.title,
						importance: getSingleBoard.importance,
						description: getSingleBoard.description,
						read: getSingleBoard.read,
						comments: getData._id,
						like: getSingleBoard.like,
						likeBoolean: getSingleBoard.likeBoolean,
						dateCreated: getSingleBoard.dateCreated,
						dateUpdated: new Date()
					};
					// HTTP PUT /api/board/:id
					$http({
						method: 'PUT',
						url: '/api/board/' + getBoardId,
						data: addCommentData
					// HTTP PUT success callback
					}).then(function successCallback(res) {
						getBoardMessages();

					//HTTP PUT error callback
					}, function errorCallback(res) {
						getBoardMessages();
					});
				});

			//HTTP POST /api/comment error callback
			}, function errorCallback(res) {
				getBoardMessages();
			});
			$('#commentModal').modal('close');
		};

		$scope.likeButton = function(boardMessage) {
			console.log(boardMessage);

			var boardId = boardMessage._id;
			var likeStatus = !boardMessage.likeBoolean;
			var updateBoardMessage = {};

			console.log(boardMessage.likeBoolean);

			// Dislike status
			if (boardMessage.likeBoolean) {
				updateBoardMessage = {
					title: boardMessage.title,
					importance: boardMessage.importance,
					description: boardMessage.description,
					read: boardMessage.read,
					like: boardMessage.like - 1,
					likeBoolean: likeStatus,
					dateCreated: boardMessage.dateCreated,
					dateUpdated: boardMessage.dateUpdated
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
					likeBoolean: likeStatus,
					dateCreated: boardMessage.dateCreated,
					dateUpdated: boardMessage.dateUpdated
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
				like: boardMessage.like,
				likeBoolean: boardMessage.likeBoolean,
				dateCreated: boardMessage.dateCreated,
				dateUpdated: new Date()
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
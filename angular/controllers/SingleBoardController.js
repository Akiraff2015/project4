(function() {
	var app = angular.module('InventoryApp');

	app.controller('SingleBoardController', ['$scope', '$http', function($scope, $http) {
		// Getting id from url
		var tempArrUrl = window.location.href.split('/');
		var getId = tempArrUrl[tempArrUrl.length-1];
		
		$scope.editCommentMode = true;
		$scope.singleBoard = {};

		//TODO: remove formatDate?
		// $scope.formatDate = [];

		$scope.likeStatus = function(comment) {
			var getCommentId = comment._id;
			var updateCommentBoolean = !comment.likeBoolean;

			if (!comment.likeBoolean) {
				let createCommentObj = {
					comment: comment.comment,
					like: comment.like + 1,
					likeBoolean: updateCommentBoolean,
					dateCreated: comment.dateCreated,
					dateUpdated: comment.dateUpdated
				};
			}

			else {
				let createCommentObj = {
					comment: comment.comment,
					like: comment.like -1,
					likeBoolean: updateCommentBoolean,
					dateCreated: comment.dateCreated,
					dateUpdated: comment.dateUpdated
				};
			}

			$http({
				method: 'PUT',
				url: '/api/comment/' + getCommentId,
				data: createCommentObj

			}).then(function successCallback(res) {
				$scope.getSingleBoard();

			}, function errorCallback(res) {
				$scope.getSingleBoard();
			});
		};

		$scope.getSingleBoard = () => {
			$http.get('/api/board/' + getId).then(function(res) {
				$scope.singleBoard = res.data;
				$scope.singleBoard.dateCreated = moment($scope.singleBoard.dateCreated).format('DD MMM, YYYY [at] h:mm:ss');
			});
		};

		// Replying to new comments
		$scope.replyComment = function(comment) {
			var createCommentObj = {
				comment: comment.comment,
				like: comment.like,
				likeBoolean: false,
				dateCreated: new Date(),
				dateUpdated: new Date()
			};

			// Getting API POST comment
			$http({
				method :'POST',
				url: '/api/comment',
				data: createCommentObj

			// /api/comment POST success callback
			}).then(function successCallback(res) {
				$http.get('/api/newest-comment').then(function(res) {
					var getData = res.data;

					// /api/board GET callback
					$http.get('/api/board/' + getId).then(function(res) {
						var addCommentData = {
							title: res.data.title,
							importance: res.data.importance,
							description: res.data.description,
							read: res.data.read,
							comments: getData._id,
							like: res.data.like,
							likeBoolean: res.data.likeBoolean,
							dateCreated: moment(res.data.dateCreated).format('DD MMM [at] YYYY, h:mm:ss'),
							dateUpdated: res.data.dateUpdated
						};
						//(moment($scope.singleBoard.comments.dateCreated).format('DD MMM, YYYY [at] h:mm:ss'));
						$http({
							method: 'PUT',
							url: '/api/board/' + res.data._id,
							data: addCommentData

						}).then(function successCallback(res) {
							$scope.getSingleBoard();

						}, function errorCallback(res) {
							$scope.getSingleBoard();
						});
					}); //end /api/board/:id callback
				});
			}, function errorCallback(res) {
				$scope.getSingleBoard();
			});
		};

		$scope.editComment = function(comment, updateComment) {
			var getCommentId = comment._id;

			var updateCommentObj = {
				comment: updateComment,
				like: comment.like,
				likeBoolean: comment.likeBoolean,
				dateCreated: comment.dateCreated,
				dateUpdated: new Date()
			};

			$http({
				method: 'PUT',
				url: '/api/comment/' + getCommentId,
				data: updateCommentObj

			}).then(function successCallback(res) {
				$scope.getSingleBoard();

			}, function errorCallback(res) {
				$scope.getSingleBoard();
			});
		};

		$scope.deleteComment = function(comment) {
			var getCommentId = comment._id;

			$http({
				method: 'DELETE',
				url: '/api/comment/' + getCommentId

			}).then(function successCallback(res) {
				$scope.getSingleBoard();

			}, function errorCallback(res) {
				$scope.getSingleBoard();
			});
		};

		$scope.initCommentModal = function() {
			$('#commentModal').modal();
		};

		$scope.closeCommentModal = function() {
			$('#commentModal').modal('close');
		};

		$scope.getSingleBoard();

	}]);
})();
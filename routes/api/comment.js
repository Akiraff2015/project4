var Comment = require('../../angular/modules/comment');

module.exports = function(app) {
	app.get('/api/comments', function(req, res) {
		Comment.find({}, function(err, comments) {
			if (err) {
				res.status(404).send(err);
			}

			else {
				res.status(200).send(comments);
			}
		});
	});

	app.get('/api/newest-comment', function(req, res) {
		Comment.findOne().sort({ field: 'asc', _id: -1 }).limit(1).exec(function(err, comment) {
			if (err) {
				res.status(404).send(err);
			}

			else {
				res.status(200).send(comment);
			}
		});
	});

	app.post('/api/comment', function(req, res) {
		var newComment;

		newComment = new Comment({
			comment: req.body.comment,
			like: req.body.like,
			likeBoolean: req.body.likeBoolean,
			dateCreated: req.body.dateCreated,
			dateUpdated: req.body.dateUpdated
		});

		newComment.save(function(err) {
			if (err) {
				res.status(500).send(err);
			}

			else {
				res.status(200).send(newComment);
			}
		});
	});

	app.put('/api/comment/:id', function(req, res) {
		var id = req.params.id;

		var updateCommentObj = {
			comment: req.body.comment,
			like: req.body.like,
			likeBoolean: req.body.likeBoolean,
			dateCreated: req.body.dateCreated,
			dateUpdated: req.body.dateUpdated
		};

		Comment.findByIdAndUpdate({_id: id}, updateCommentObj, function(err) {
			if (err) {
				res.status.send(err);
			}

			else {
				res.status(200).send(updateCommentObj);
			}
		});
	});

	app.get('/api/comment/:id', function(req, res) {
		var id = req.params.id;
		Comment.findById({_id: id}, function(err, comment) {
			if (err) {
				res.status(404).send(err);
			}

			else {
				res.status(200).send(comment);
			}
		});
	});

	app.delete('/api/comment/:id', function(req, res) {
		var id = req.params.id;
		Comment.findOneAndRemove({_id: id}, function(err, comment) {
			if (err) {
				res.status(500).send(err);
			}

			else {
				res.status(200).send({message: "success!"});
			}
		});
	});
};
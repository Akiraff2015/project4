var Board = require('../../angular/modules/board');

module.exports = function(app) {
	// Method: GET board
	app.get('/api/boards', function(req, res) {
		Board.find({}, function(err, boards) {
			if (err) {
				res.status(404).send(err);
			}

			else {
				res.status(200).send(boards);
			}
		}).populate('comments').exec(function(err) {
			if (err) {
				res.status(500).send(err);
			}
		});
	});

	// Method: POST --> Board
	app.post('/api/board', function(req, res) {
		var newBoardMessage;

		newBoardMessage = new Board({
			title: req.body.title,
			importance: req.body.importance,
			description: req.body.description,
			dateCreated: new Date()
		});

		newBoardMessage.save(function(err) {
			if (err) {
				res.status(500).send(err);
			}

			else {
				res.status(201).send(newBoardMessage);
			}
		});
	});

	// METHOD: PUT --> Board:id
	app.put('/api/board/:id', function(req, res) {
		var id = req.params.id;

		if (!!req.body.comments) {
			var updateBoardMessageObj = {
				$push: {"comments": req.body.comments},
				title: req.body.title,
				importance: req.body.importance,
				description: req.body.description,
				read: req.body.read,
				like: req.body.like,
				likeBoolean: req.body.LikeBoolean,
				dateCreated: req.body.dateCreated,
				dateUpdated: req.body.dateUpdated
			};
		}

		else {
			var updateBoardMessageObj = {
				title: req.body.title,
				importance: req.body.importance,
				description: req.body.description,
				read: req.body.read,
				like: req.body.like,
				likeBoolean: req.body.likeBoolean,
				dateCreated: req.body.dateCreated,
				dateUpdated: req.body.dateUpdated
			};
		}

		Board.findByIdAndUpdate({_id: id}, updateBoardMessageObj, function(err) {
			if (err) {
				res.status(500).send(err);
			}

			else {
				res.status(200).send(updateBoardMessageObj);
			}
		});
	});

	// Method: GET --> Board:id
	app.get('/api/board/:id', function(req, res) {
		var id = req.params.id;
		Board.findById({_id: id}, function(err, board) {
			if (err) {
				res.status(404).send(err);
			}

			else {
				res.status(200).send(board);
			}
		}).populate('comments').exec(function(err) {
			if (err) {
				res.status(500).send(err);
			}
		});
	});

	//Method: Delete --> Board:id
	app.delete('/api/board/:id', function(req, res) {
		var id = req.params.id;
		Board.findOneAndRemove({_id: id}, function(err, board) {
			if (err) {
				res.status(500).send(err);
			}

			else {
				res.status(200).send({message:"sucecss!"});
			}
		});
	});
};
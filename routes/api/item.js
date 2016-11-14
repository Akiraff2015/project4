var Item = require('../../angular/modules/item');

module.exports = function(app) {
		//Method: GET --> Item
	app.get('/api/items', function(req, res) {
		Item.find({}, function(err, items) {
			if (err) {
				res.status(404).send(err);
			}

			else {
				res.status(200).send(items);
			}
		});
	});

	//Method: POST --> Item
	app.post('/api/item', function(req, res) {
		var newItem;

		newItem = new Item({
			title: req.body.title,
			quantity: req.body.quantity,
			description: req.body.description
		});

		newItem.save(function(err) {
			if (err) {
				console.log(err);
			}

			else {
				console.log("Item created!");
			}

			res.status(201).send(newItem);
		});
	});

	//Method: PUT --> Item:id
	app.put('/api/item/:id', function(req, res) {
		var id = req.params.id;
		var updateItem;

		var updateItemObj = {
			title: req.body.title,
			quantity: req.body.quantity,
			description: req.body.description
		}

		Item.findByIdAndUpdate({_id: id}, updateItemObj, function(err) {
			if (err) {
				res.status.send(err);
			}

			else {
				res.status(200).send(updateItemObj);
			}
		});
	});

	//Method: GET --> ITEM:id
	app.get('/api/item/:id', function(req, res) {
		var id = req.params.id;
		Item.findById({_id: id}, function(err, item) {
			if (err) {
				res.status(404).send(err);
			}

			else {
				res.status(200).send(item);
			}
		});
	});

	//Method: DELETE --> ITEM:id
	app.delete('/api/item/:id', function(req, res) {
		var id = req.params.id;

		Item.findOneAndRemove({_id: id}, function(err, item) {
			if (err) {
				res.status(500).send(err);
			}

			else {
				res.status(200).send({message:"success!"});
			}
		});
	});
}
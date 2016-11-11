var Item = require('../angular/modules/item');
var ItemController = ('../angular/controllers/items');

module.exports = function(app, passport) {
	app.get('/', function(req, res) {
		res.render('../angular/views/index', {});
	});

	//Method: GET --> Item:id
	app.get('/api/items', function(req, res) {
		// res.render('../angular/views/item/show', {});
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

	// Render /items page
	app.get('/items', function(req, res) {
		res.render('../angular/views/item/show', {});
	});

	app.get('/dashboard/item/new', function(req, res) {
		res.render('../angular/views/item/new', {});
	});

	app.post('/item/new', function(req, res) {
		var item = new Item();
		item.title = req.body.title;
		item.quantity = req.body.quantity;
		item.description = req.body.description;

		item.save(function(err, item) {
			if (err) {
				res.json({error: err});
			}
			res.redirect('/items');
		});
	});

	// GET register
	app.get('/register', function(req, res) {
		res.render('../angular/views/register', {});
	});

	// GET success
	app.get('/success', function(req, res) {
		res.render('../angular/views/tmp/.', {});
	});

	app.get('/fail', function(req, res) {
		res.render('../angular/views/tmp/fail', {});
	});

	app.get('/logout', function(req, res) {
		req.logout();
		res.redirect('/');
	});

	app.post('/register', passport.authenticate('local-signup', {
		successRedirect: '/success',
		failureRedirect: '/fail',
		failureFlash: true
	}));

	app.post('/login', passport.authenticate('local-login', {
		successRedirect: '/success',
		failureRedirect: '/fail',
		failureFlash: true
	}));
}
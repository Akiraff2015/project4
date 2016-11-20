var Order = require('../../angular/modules/order');

module.exports = function(app) {
	app.get('/api/orders', function(req, res) {
		Order.find({}, function(err, orders) {
			if (err) {
				res.status(404).send(err);
			}

			else {
				res.status(200).send(orders);
			}
		});
	});

	app.post('/api/order', function(req, res) {
		var newOrder;

		newOrder = new Order({
			orderRef: req.body.orderRef,
			order: req.body.order,
			totalPrice: req.body.totalPrice,
			orderConfirmed: req.body.orderConfirmed,
			dateCreated: req.body.dateCreated,
			dateUpdated: req.body.dateUpdated
		});

		newOrder.save(function(err) {
			if (err) {
				res.status(500).send(err);
			}

			else {
				res.status(200).send(newOrder);
			}
		});
	});

	app.put('/api/order/:id', function(req, res) {
		var id = req.params.id;

		var updateOrderObj = {
			orderRef: req.body.orderRef,
			order: req.body.order,
			totalPrice: req.body.totalPrice,
			orderConfirmed: req.body.orderConfirmed,
			dateCreated: req.body.dateCreated,
			dateUpdated: req.body.dateUpdated
		};

		Order.findByIdAndUpdate({_id: id}, updateOrderObj, function(err) {
			if (err) {
				res.status(404).send(err);
			}

			else {
				res.status(200).send(updateOrderObj);
			}
		});
	});

	app.get('/api/order/:id', function(req, res) {
		var id = req.params.id;
		Order.findById({_id: id}, function(err, order) {
			if (err) {
				res.status(404).send(err);
			}

			else {
				res.status(200).send(order);
			}
		});
	});

	app.delete('/api/order/:id', function(req, res) {
		var id = req.params.id;
		Order.findOneAndRemove({_id: id}, function(req, order) {
			if (err) {
				res.status(500).send(err);
			}

			else {
				res.status(200).send({message: "success!"});
			}
		});
	});
};
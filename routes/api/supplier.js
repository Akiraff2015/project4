var Supplier = require('../../angular/modules/supplier');

module.exports = function(app) {
	app.get('/api/suppliers', function(req, res) {
		Supplier.find({}, function(err, suppliers) {
			if (err) {
				res.status(404).send(err);
			}

			else {
				res.status(200).send(suppliers);
			}
		});
	});

	app.post('/api/supplier', function(req, res) {
		var newSupplier;

		newSupplier = new Supplier({
			companyName: req.body.companyName,
			contactName: req.body.contactName,
			email: req.body.email,
			phone: req.body.phone
		});

		newSupplier.save(function(err) {
			if (err) {
				console.log(err);
			}

			else {
				console.log("Supplier have been created!");
			}
		});
	});

	app.put('/api/supplier/:id', function(req, res) {
		var id = req.params.id;
		var updateSupplier;

		var updateSupplierObj = {
			companyName: req.body.companyName,
			contactName: req.body.contactName,
			email: req.body.email,
			phone: req.body.phone
		};

		Supplier.findByIdAndUpdate({_id: id}, updateSupplierObj, function(err) {
			if (err) {
				res.status.send(err);
			}

			else {
				res.status(200).send(updateSupplierObj);
			}
		});
	});

	app.delete('/api/supplier/:id', function(req, res) {
		var id = req.params.id;
		Supplier.findOneAndRemove({_id: id}, function(req, supplier) {
			if (err) {
				res.status(500).send(err);
			}

			else {
				res.status(200).send({message: "success!"});
			}
		});
	});
};
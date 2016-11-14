var Ingredient = require('../../angular/modules/ingredient');

module.exports = function(app) {
	app.get('/api/ingredients', function(req, res) {
		Ingredient.find({}, function(err, ingredients) {
			if (err) {
				res.status(404).send(err);
			}

			else {
				res.status(200).send(ingredients);
			}
		});
	});

	app.post('/api/ingredient', function(req, res) {
		var newIngredient;

		newIngredient = new Ingredient({
			name: req.body.name,
			supplier: req.body.supplier,
			referenceNo: req.body.referenceNo
		});

		newIngredient.save(function(err) {
			if (err) {
				console.log(err);
			}

			else {
				console.log("Ingredient have been created!");
			}
		});
	});

	app.put('/api/ingredient/:id', function(req, res) {
		var id = req.params.id;
		var updateIngredient;

		var updateIngredientObj = {
			name: req.body.name,
			supplier: req.body.supplier,
			referenceNo: req.body.referenceNo
		};

		Ingredient.findByIdAndUpdate({_id: id}, updateIngredientObj, function(err) {
			if (err) {
				res.status.send(err);
			}

			else {
				res.status(200).send(updateIngredientObj);
			}
		});
	});

	app.delete('/api/ingredient/:id', function(req, res) {
		var id: req.params.id;
		Ingredient.findOneAndRemove({_id: id}, function(req, ingredient) {
			if (err) {
				res.status(500).send(err);
			}

			else {
				res.status(200).send({message: "success!"});
			}
		});
	});
};
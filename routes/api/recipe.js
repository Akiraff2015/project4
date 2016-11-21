var Recipe = require('../../angular/modules/recipe');

module.exports = function(app) {
	app.get('/api/recipes', function(req, res) {
		Recipe.find({}, function(err, recipes) {
			if (err) {
				res.status(404).send(err);
			}

			else {
				res.status(200).send(recipes);
			}
		});
	});

	app.post('/api/recipe', function(req, res) {
		var newRecipe;

		newRecipe = new Recipe({
			name: req.body.name,
			category: req.body.category,
			instruction: req.body.instruction,
			ingredients: req.body.ingredients,
			dateCreated: new Date()
		});

		newRecipe.save(function(err) {
			if (err) {
				console.log(err);
			}

			else {
				console.log("Recipe have been created!");
			}
		});
	});

	app.put('/api/recipe/:id', function(req, res) {
		var id = req.params.id;
		var updateRecipe;

		var updateRecipeObj = {
			name: req.body.name,
			category: req.body.category,
			instruction: req.body.instruction,
			ingredients: req.body.ingredients,
			dateCreated: req.body.dateCreated,
			dateUpdated: new Date()
		};

		Recipe.findByIdAndUpdate({_id: id}, updateRecipeObj, function(err) {
			if (err) {
				res.status.send(err);
			}

			else {
				res.status(200).send(updateRecipeObj);
			}
		});
	});

	app.delete('/api/recipe/:id', function(req, res) {
		var id = req.params.id;

		Recipe.findOneAndRemove({_id: id}, function(req, recipe) {
			if (err) {
				res.status(500).send(err);
			}

			else {
				res.status(200).send({message: "success!"});
			}
		});
	});
};
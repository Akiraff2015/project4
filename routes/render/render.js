module.exports = function(app) {
	var loggedIn = function(req, res, next) {
		if (req.isAuthenticated()) {
			next();
		} else {
			res.redirect('/');
		}
	};
	// Render /items page
	app.get('/items', loggedIn, (req, res) => res.render('../angular/views/item/show', {}));

	// Render /board page
	app.get('/board', loggedIn, (req, res) => res.render('../angular/views/board/show', {}));

	// /board/:id
	app.get('/board/:id', loggedIn, (req, res) => res.render('../angular/views/singleBoard/show', {}));

	// Render /graph page
	app.get('/graph', loggedIn, (req, res) => res.render('../angular/views/graph/show', {}));

	// Render /dashboard page
	app.get('/dashboard', loggedIn, (req, res) => res.render('../angular/views/dashboard/show', {}));

    // Render /order page
	app.get('/order', loggedIn, (req, res) => res.render('../angular/views/order/show', {}));


	//Render /recipe page
	app.get('/recipe', loggedIn, function(req, res) {
		res.render('../angular/views/recipe/show', {});
	});

	//Render /ingredient page
	app.get('/ingredient', loggedIn, function(req, res) {
		res.render('../angular/views/ingredient/show', {});
	});

	//render /history page
	app.get('/history', loggedIn, function(req, res) {
		res.render('../angular/views/history/show', {});
	});

	//render /supplier page
	app.get('/supplier', loggedIn, function(req, res) {
		res.render('../angular/views/supplier/show', {});
	});

	app.get('/success', function(req, res) {
		res.render('../angular/views/index');
	});
};
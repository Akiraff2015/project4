module.exports = function(app) {
	var loggedIn = function(req, res, next) {
		if (req.isAuthenticated()) {
			next();
		} else {
			res.redirect('/');
		}
	}
	// Render /items page
	app.get('/items', loggedIn, function(req, res) {
		res.render('../angular/views/item/show', {});
	});

	// Render /board page
	app.get('/board', loggedIn, function(req, res) {
		res.render('../angular/views/board/show', {});
	});

	app.get('/board/:id', loggedIn, function(req, res) {
		res.render('../angular/views/singleBoard/show', {});
	});

	// Render /graph page
	app.get('/graph', loggedIn, function(req, res) {
		res.render('../angular/views/graph/show', {});
	});

	//Render /dashboard page
	app.get('/dashboard', loggedIn, function(req, res) {
		res.render('../angular/views/dashboard/show', {});
	});

	// Render /order page
	app.get('/order', loggedIn, function(req, res) {
		res.render('../angular/views/order/show', {});
	});

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

	//rennder /supplier page
	app.get('/supplier', loggedIn, function(req, res) {
		res.render('../angular/views/supplier/show', {});
	});
};
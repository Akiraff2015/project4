module.exports = function(app) {
	// Render /items page
	app.get('/items', function(req, res) {
		res.render('../angular/views/item/show', {});
	});

	// Render /graph page
	app.get('/graph', function(req, res) {
		res.render('../angular/views/graph/show', {});
	});

	//Render /dashboard page
	app.get('/dashboard', function(req, res) {
		res.render('../angular/views/dashboard/show', {});
	});

	// Render /order page
	app.get('/order', function(req, res) {
		res.render('../angular/views/order/show', {});
	});

	//Render /recipe page
	app.get('/recipe', function(req, res) {
		res.render('../angular/views/recipe/show', {});
	});

	//Render /ingredient page
	app.get('/ingredient', function(req, res) {
		res.render('../angular/views/ingredient/show', {});
	});

	//render /history page
	app.get('/history', function(req, res) {
		res.render('../angular/views/history/show', {});
	});
};
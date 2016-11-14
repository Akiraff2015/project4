module.exports = function(app, passport) {
	app.get('/', function(req, res) {
		res.render('../angular/views/index', {});
	});

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
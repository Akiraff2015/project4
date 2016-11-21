module.exports = function(app, passport) {
	app.get('/', function(req, res) {
		res.render('../angular/views/index', {});
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
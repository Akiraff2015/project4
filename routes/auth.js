var User = require('../angular/modules/user');

module.exports = function(app, passport) {
	app.post('/register', (req, res) => {
		let {username, password} = req.body;
		User.findOne({username}, (err, doc) => {
			if (err) {
				res.status(500).send('Error occured');
			} else {
				if (doc) {
					res.status(500).send('Username already exists');
				} else {
					let newUsername = new User();
					newUsername.username = username;
					newUsername.password = newUsername.hashPassword(password);
					newUsername.save((err, user) => {
						if (err) {
							res.status(500).send('Database error');

						// User successfully registered
						} else {
							// res.send(user);
							res.redirect('/success');
						}
					});
				}
			}
		});
	});

	app.post('/login', passport.authenticate('local', {
		failureRedirect: '/',
		successRedirect: '/dashboard'
	}), function(req, res) {
		res.send('hey');
	});
};
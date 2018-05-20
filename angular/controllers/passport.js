var localStrategy = require('passport-local').Strategy;
var User = require('../modules/user');

module.exports = function(passport) {
	passport.serializeUser((user, done) => {
		done(null, user);
	});

	passport.deserializeUser((user, done) => {
		done(null, user);
	});

	passport.use(new localStrategy(function(username, password, done) {
		User.findOne({username}, function(err, data) {
			if (err) {
				done(err)
			} else {
				if (data) {
					var valid = data.comparePassword(password, data.password);
					if (valid) {
						done(null, data);
					} else {
						done(null, false);
					}
				} else {
					done(null, false);
				}
			}
		});
	}));
}
// Load passport local
var localStrategy = require('passport-local').Strategy;

// Load validator
var validator = require('validator');

//Load user model
var User = require('../modules/user');


module.exports = function(passport) {
	// Serialize user
	passport.serializeUser( function( user, done){
		done(null, user.id);
	});

	// Deserialize user
	passport.deserializeUser(function(id, done){
		User.findById(id, function(err, user){
			done(err, user);
		});
	});

	// Local local-signup strategy
	passport.use('local-signup', new localStrategy({
		usernameField: 'username',
		passwordField: 'password',
		passReqToCallback: true
	},
		function(req, username, password, done) {
			// checks if username is alpha-numeric
			if (!validator.isAlphanumeric(username)) {
				return done(null, false, req.flash('loginMessage', 'Not valid username!'));
			}

			// Checks if the password is at least 8 characters
			if (password.length < 8) {
				return done(null, false, req.flash('loginMessage', 'Password is less than 8 characters!'));
			}

			process.nextTick(function() {
				User.findOne({'local.username': username}, function(err, user) {
					if (err) { 
						return done(err);
					}

					if (user) {
						return done(null, false, req.flash('loginMessage', 'That username is already in use.'));
					}

					// Creating new User object
					else {
						var newUser = new User();
						newUser.local.username = username;
						newUser.local.password = password;

						newUser.save(function(err) {
							if (err) {
								console.log(err);
							}
							return done(null, newUser, req.flash('loginMessage', 'Registered an account successfully!'));
						});
					}
				});
			});
		}
	)); //end of passport.use('local-signup', new Object({}));

	// Passport local-login
	passport.use('local-login', new localStrategy({
		usernameField: 'username',
		passwordField: 'password',
		passReqToCallback: true
	},
		function(req, username, password, done) {
			process.nextTick(function() {
				User.findOne({'local.username': username}, function(err, user) {
					if (err) {
						return done(err);
					}
					// Validates if user exists in the database.
					if (!user) {
						return done(null, false, req.flash('loginMessage', 'Invalid username!'));
					}
					// Checks password
					user.validPassword(password, function(err, isMatch) {
						if (isMatch) {
							return done(null, user, req.flash('loginMessage', 'Login successfully!'));
						}
						return done(null, false, req.flash('loginMessage', 'Invalid password!'));
					});
				}); //End of User.findOne({}, callback);
			});
		}
	)); //end of passport.use('local-login', new Object({}));
};
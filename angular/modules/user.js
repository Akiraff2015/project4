var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');

var userSchema = mongoose.Schema({
	username: {
		type: String,
		required: true
	},
	password: {
		type: String,
		required: true
	}
});

// Hashing password
userSchema.methods.hashPassword = password => bcrypt.hashSync(password, bcrypt.genSaltSync(10));

// Comparing hash password with string password
userSchema.methods.comparePassword = (password, hash) => bcrypt.compareSync(password, hash);

module.exports = mongoose.model('users', userSchema, 'users');

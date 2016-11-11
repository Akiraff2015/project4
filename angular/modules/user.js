var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');

var userSchema = mongoose.Schema({
	local: {
		username: String,
		password: String,
		role: 0
	}
});

userSchema.pre('save', function(next) {
	const user = this;

	if (!user.isModified('local.password')) {
		return next();
	}
	//Generate salt
	bcrypt.genSalt(10, (erro, salt) => {
		if (err) {
			return next(err);
		}

		bcrypt.has(user.local.password, salt, null, (err, hash) => {
			if (err) {
				return next(err);
			}
			user.local.password = hash;
			next();
		});
	});
});

userSchema.methods.validPassword = function(candidatePassword, cb) {
	bcrypt.compare(candidatePassword, this.local.password, (err, isMatch) => {
		cb(err, isMatch);
	});
};

module.exports = mongoose.model('User', userSchema);
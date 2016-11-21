const mongoose = require('mongoose');

var commentSchema = mongoose.Schema({
	comment: {
		type: String,
		maxlength: 300
	},

	like: {
		type: Number,
		default: 0,
		min: 0
	},

	likeBoolean: {
		type: Boolean,
		default: false
	},

	dateCreated: {
		type: Date,
		default: Date.now
	},

	dateUpdated: {
		type: Date,
		default: Date.now
	}
});

module.exports = mongoose.model('Comment', commentSchema);
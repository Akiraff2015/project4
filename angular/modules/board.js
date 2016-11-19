const mongoose = require('mongoose');
var Comment = require('./comment');

var boardSchema = new mongoose.Schema({
	title: {
		type: String, 
		required: true
	},

	importance: {
		type: String, 
		required: false, 
		default: "Announcement"
	},

	description: {
		type: String, 
		required: true
	},

	read: {
		type: Boolean,
		default: false
	},

	comments: [{
		type: mongoose.Schema.Types.ObjectId, 
		ref: 'Comment'
	}],

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

module.exports = mongoose.model('Board', boardSchema);
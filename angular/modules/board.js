const mongoose = require('mongoose');

var boardSchema = mongoose.Schema({
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
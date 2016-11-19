const mongoose = require('mongoose');

var itemSchema = mongoose.Schema({
	title: {
		type: String, 
		required: true
	},

	quantity: [Number],

	description: {
		type: String, 
		default: "No description for this item."
	},

	dateCreated: {
		type: Date, 
		default: Date.now
	},

	dateUpdated: {
		type: [Date],
		default: Date.now
	}
});

module.exports = mongoose.model('Item', itemSchema);
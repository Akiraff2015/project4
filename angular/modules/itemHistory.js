const mongoose = require('mongoose');
var Item = require('./item');

var itemHistorySchema = mongoose.Schema({
	title: {
		type: mongoose.Schema.Types.ObjectId, 
		ref: 'Item'
	},

	quantity: {
		type: [Number],
		min: 0,
		required: true
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

module.exports = mongoose.model('ItemHistory', itemHistorySchema);
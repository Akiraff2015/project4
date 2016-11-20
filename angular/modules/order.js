const mongoose = require('mongoose');

var orderSchema = mongoose.Schema({
	orderRef: {
		type: String,
		unique: true
	},

	order: [],

	totalPrice: {
		type: Number,
		default: 0,
		min: 0
	},

	orderConfirmed: {
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

module.exports = mongoose.model('Order', orderSchema);
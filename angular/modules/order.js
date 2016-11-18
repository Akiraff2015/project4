const mongoose = require('mongoose');

var orderSchema = mongoose.Schema({
	subject: {
		type: String,
		required: true
	},

	orderRef: {
		type: String
	},

	order: {
		type: String
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
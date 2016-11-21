const mongoose = require('mongoose');

var supplierSchema = mongoose.Schema({
	companyName: {
		type: String,
		required: true
	},

	contactName: {
		type: String,
		required: true
	},

	email: {
		type: String,
		required: true
	},

	phone: {
		type: String,
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

module.exports = mongoose.model('Supplier', supplierSchema);
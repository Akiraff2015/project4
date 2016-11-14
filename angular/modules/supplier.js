const mongoose = require('mongoose');

var supplierSchema = mongoose.Schema({
	companyName: String,
	contactName: String,
	email: String,
	phone: String
});

module.exports = mongoose.model('Supplier', supplierSchema);
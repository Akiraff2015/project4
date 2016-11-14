const mongoose = require('mongoose');

var orderSchema = mongoose.Schema({
	name: String,
	orderRef: String,
	order: String,
	orderConfirmed: Boolean,
	date: Date
});

module.exports = mongoose.model('Order', orderSchema);
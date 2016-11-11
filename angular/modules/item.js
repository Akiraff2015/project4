const mongoose = require('mongoose');

var itemSchema = mongoose.Schema({
	title: String,
	quantity: Number,
	description: String
});

module.exports = mongoose.model('Item', itemSchema);
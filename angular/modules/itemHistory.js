const mongoose = require('mongoose');

var itemHistorySchema = mongoose.Schema({
	title: String,
	quantity: Number,
	updateHistory: Date
});

module.exports = mongoose.model('ItemHistory', itemHistorySchema);
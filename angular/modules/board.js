const mongoose = require('mongoose');

var boardSchema = mongoose.Schema({
	title: String,
	importance: Number,
	description: String
});

module.exports = mongoose.model('Board', boardSchema);
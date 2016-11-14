const mongoose = require('mongoose');

var boardSchema = mongoose.Schema({
	title: String,
	importance: String,
	description: String
	// tags: [{tag:String, type:{type:String}}]
});

module.exports = mongoose.model('Board', boardSchema);
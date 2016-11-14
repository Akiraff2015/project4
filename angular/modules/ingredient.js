const mongoose = require('mongoose');

var ingredientSchema = mongoose.Schema({
	name: {
		type: String, 
		required: true
	},

	supplier: {
		type: String,
		required: true
	},

	referenceNo: {
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

module.exports = mongoose.model('Ingrendient', ingredientSchema);
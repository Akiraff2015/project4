const mongoose = require('mongoose');

var ingredientSchema = mongoose.Schema({
	name: String,
	supplier: String,
	referenceNo: String
});

module.exports = mongoose.model('Ingrendient', ingredientSchema);
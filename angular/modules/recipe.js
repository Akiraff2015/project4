const mongoose = require('mongoose');

// TODO: reference back to ingredient
// var Ingredient = require('./ingredient');

var recipeSchema = mongoose.Schema({
	name: {
		type: String,
		requried: true
	},

	category: {
		type: String,
		required: true
	},

	instruction: {
		type: String,
		required: true
	},

	ingredients: [{
		type: [String]
	}],

	dateCreated: {
		type: Date, 
		default: Date.now
	},

	dateUpdated: {
		type: Date, 
		default: Date.now
	}
});

module.exports = mongoose.model('Recipe', recipeSchema);
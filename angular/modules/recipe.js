const mongoose = require('mongoose');
var Ingredient = require('./ingredient');

var recipeSchema = mongoose.Schema({
	name: {
		type: String,
		requried: true
	},

	category: {
		type: String,
		required: true
	},

	instructions: {
		type: String,
		required: true
	},

	ingredients: [{
		type: mongoose.Schema.Types.ObjectId, 
		ref:'Ingredient'
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
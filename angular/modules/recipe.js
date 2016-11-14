const mongoose = require('mongoose');
var Ingredient = require('./ingredient');

var recipeSchema = mongoose.Schema({
	name: String,
	category: String,
	instructions: String,
	ingredients: [{type: Schema.Types.ObjectId, ref:'Ingredient'}]
});
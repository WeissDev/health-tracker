/**
 * MODEL
 */

var app = app || {};

app.FoodModel = Backbone.Model.extend({
	/** The default attributes for one food item */
	defaults: {
		name: '',
		brand: '',
		calories: 0,
		index: 1
	}
});
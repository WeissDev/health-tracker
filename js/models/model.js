/**
 * MODEL
 */

var app = app || {};

app.FoodModel = Backbone.Model.extend({
	/**
	 * The default attributes for one food item
	 * name: Food Item Name
	 * brand: Brand of Food Item
	 * calories: Calories of item
	 * index: Each item gets an index
	 */
	defaults: {
		name: '',
		brand: '',
		calories: 0,
		index: 1
	}
});
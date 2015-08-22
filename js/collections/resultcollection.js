var app = app || {};

/** FoodCollection to store search results */
var FoodCollection = Backbone.Collection.extend({
	/** Reference to this collections model */
	model: app.FoodModel,

	localStorage: new Backbone.LocalStorage('results-backbone')


});

app.FoodCollection = new FoodCollection();
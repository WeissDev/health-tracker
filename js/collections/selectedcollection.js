/**
 * COLLECTION
 */

var app = app || {};
/** Collection for items selected by user */
var SelectedCollection = Backbone.Collection.extend({

	/** Reference to this Collections Model*/
	model: app.FoodModel,

	/** Save collection to localStorage under 'selected-backbone' */
	localStorage: new Backbone.LocalStorage('selected-backbone')
});

app.SelectedCollection = new SelectedCollection();
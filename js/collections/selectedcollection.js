/**
 * COLLECTION
 */

var app = app || {};
/** Collection for items selected by user */
var SelectedCollection = Backbone.Collection.extend({

	model: app.FoodModel,

	localStorage: new Backbone.LocalStorage('selected-backbone')
});

app.SelectedCollection = new SelectedCollection();
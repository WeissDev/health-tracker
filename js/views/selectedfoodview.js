/**
 * VIEW
 */

var app = app || {};

app.SelectedFoodView = Backbone.View.extend({

	tagName: 'tr',
	template: _.template( $('#user-select-template').html() ),

	events: {
		'click .destroy': 'removeItem'
	},

	initialize: function(results) {
		//this.collection = new SelectedCollection(results);
		this.listenTo(this.model, 'change', this.render);
		this.listenTo(this.model, 'destroy', this.remove);
	},

	render: function() {
		this.$el.html(this.template(this.model.attributes));
		return this;
	},

	removeItem: function() {
		this.model.destroy();
	}

});
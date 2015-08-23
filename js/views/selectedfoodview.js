/**
 * VIEW
 */

var app = app || {};

app.SelectedFoodView = Backbone.View.extend({

	/** Create new Table Row for each selected food */
	tagName: 'tr',
	template: _.template( $('#user-select-template').html() ),

	events: {
		'click .destroy': 'removeItem'
	},

	/** Listens to changes to its model */
	initialize: function() {
		this.listenTo(this.model, 'change', this.render);
		this.listenTo(this.model, 'destroy', this.remove);
	},

	/** Re-renders the View every time user adds food */
	render: function() {
		this.$el.html(this.template(this.model.attributes));
		return this;
	},

	/** When user clicks remove button the selected model will be destroyed */
	removeItem: function() {
		this.model.destroy();
	}

});
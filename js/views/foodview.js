var app = app || {};

/** View for search results */
app.ResultsView = Backbone.View.extend({

	tagName: 'tr',
	template: _.template( $('#search-results-template').html() ),

	events: {
		'click .add': 'addToSelected'
	},

	initialize : function() {
		this.listenTo(this.model, 'change', this.render);
		this.listenTo(this.model, 'destroy', this.remove);
	},


	render: function() {
		/** this.el refers to table.search-results */
		this.$el.html( this.template(this.model.attributes) );


		return this;
	},

	addToSelected: function() {
		var newItem = new app.FoodModel({
			name: this.model.get('name'),
			brand: this.model.get('brand'),
			calories: this.model.get('calories'),
			index: app.FoodModel.length
		});
		app.SelectedCollection.create(newItem);
	}
});
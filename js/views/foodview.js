var app = app || {};

/** View for search results */
app.ResultsView = Backbone.View.extend({

	/** Creates new table row for every item */
	tagName: 'tr',
	template: _.template( $('#search-results-template').html() ),

	events: {
		'click .add': 'addToSelected'
	},

	/** Listens to changes to its model */
	initialize : function() {
		this.listenTo(this.model, 'change', this.render);
		this.listenTo(this.model, 'destroy', this.remove);
	},


	render: function() {
		this.$el.html( this.template(this.model.attributes) );
		return this;
	},

	/**
	 * When user clicks on .add button the a new FoodModel will be instantiated
	 * and appended to the SelectedCollection
	 */
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
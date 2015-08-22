var app = app || {};

/** View for users list of food items */
app.AppView = Backbone.View.extend({

	el: '#health-tracker',

	template: _.template($('#stats-template').html()),

	initialize: function(results) {
		this.collection = new FoodCollection(results);
		console.log(this.collection.toJSON());

		this.listenTo(FoodCollection, 'add', this.addOne);
		//this.listenTo(FoodCollection, 'reset', this.addAll);
		this.listenTo(FoodCollection, 'all', this.render);
		this.render();
	},

	/** Render list by looping through all results */
	render: function() {
		this.collection.each(function(result) {
			this.renderItem(result);
		}, this);
	},

	/** Render an item by creating a FoodView for it */
	renderItem: function(result) {
		var foodView = new app.FoodView({
			model: result
		});
		this.$el.append( foodView.render().el );
	},

	addOne: function(item) {
		console.log(item);
		var view = new app.SelectedFoodView({ model: item});
		$('.user-select').append( view.render().el);
	}

});
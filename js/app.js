/**
 * MODEL
 */

var app = app || {};

app.FoodModel = Backbone.Model.extend({
	/** The default attributes for one food item */
	defaults: {
		name: '',
		brand: '',
		calories: '',
		added: false
	}
});

/**
 * COLLECTION
 */

var app = app || {};

app.FoodCollection = Backbone.Collection.extend({
	/** Reference to this collections model */
	model: app.FoodModel

});

/**
 * VIEW
 */

var app = app || {};

/** View for search results */
app.FoodView = Backbone.View.extend({

	tagName: 'ul',
	className: 'search-results',
	template: _.template( $('#search-results-template').html() ),

	render: function() {
		/** this.el refers to ul#search-results */
		this.$el.html( this.template(this.model.attributes) );

		return this;
	}
});

var app = app || {};

app.SelectedFoodView = Backbone.View.extend({

	tagName: 'ul',
	className: 'user-select',
	template: _.template( $('#user-select-template').html() ),

	render: function() {
		/** this.el refers to ul#user-select */
		this.$el.html( this.template(this.model.attributes) );

		return this;
	}
});

var app = app || {};

app.SelectedFoodView = Backbone.View.extend({

	tagName: 'ul',
	className: 'user-select',
	template: _.template( $('#user-select-template').html() ),

	render: function() {
		/** this.el refers to ul#user-select */
		this.$el.html( this.template(this.model.attributes) );

		return this;
	}
});

var app = app || {};

/** View for users list of food items */
app.ListView = Backbone.View.extend({

	el: '#results',

	events: {
		'click .add': 'addToSelected'
	},

	initialize: function(results) {
		this.collection = new app.FoodCollection(results);
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

	addToSelected: function() {
		console.log('addToSelected()');
		$('.result-li').each(function(index) {
			console.log( index + ": " + $( this ).text() );
		});
	}

});

/**
 * MAIN APP
 */

var app = app || {};

$(function() {
	var searchResults = [
		{name: 'Heinz Tomato Ketchup', brand: 'Heinz', calories: 45, added: false},
		{name: 'Mountain Dew', brand: 'Mtn Dew', calories: 110, added: false},
		{name: 'Whopper', brand: 'Burger King', calories: 500, added: false}
	];

	new app.ListView(searchResults);
});
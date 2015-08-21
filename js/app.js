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
		selected: false
	},

	/** Toggle the checked state of this model */
	checkedState: function() {
		this.save({
			selected: !this.get('selected');
		});
	}
});

/**
 * COLLECTION
 */

var app = app || {};

app.FoodCollection = Backbone.Collection.extend({
	/** Reference to this collections model */
	model: app.FoodModel,

	selected: function() {
		return this.filter(function(item) {
			return item.get('selected');
		});
	},

	remaining: function() {
		return this.without.apply( this, this.selected() );
	},

	nextOrder: function() {
		if ( !this.length ) {
			return 1;
		}
		return this.last().get('order') + 1;
	},

	comparator: function(item) {
		return item.get('order');
	}

});

/**
 * VIEW
 */

var app = app || {};

/** View for search results */

app.FoodView = Backbone.View.extend({

	el: '.search-results',
	template: _.template( $('#search-results-template').html() ),

	events: {
		'click .checkbox': 'addToSelected'
	},


	render: function() {
		/** this.el refers to table.search-results */
		this.generateId()
		this.$el.append( this.template(this.model.attributes) );
		console.log(this.model.attributes);

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


app.ListView = Backbone.View.extend({

	el: '#results',

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
	}

});

// Todo Router
// ----------
var app = app || {};

var Workspace = Backbone.Router.extend({

	routes: {
		'*filter': 'setFilter'
	},

	setFilter: function( param ) {
		// Set the current filter to be used
		if ( param ) {
			param = param.trim();
		}
		app.TodoFilter = param || '';

		// Trigger a collection filter event, causing hiding/unhiding
		// of Food view items
		app.Todos.trigger('filter');
	}
});

app.TodoRouter = new Workspace();
Backbone.history.start();



/**
 * MAIN APP
 */

var app = app || {};

$(function() {

	$('#search-btn').on('click', function() {
		var searchResults = [];
		$('.search-results').empty();
		var userInput = $('#search-bar').val();

		var nutritionixUrl = 'https://api.nutritionix.com/v1_1/search/' + userInput + '?results=0:20&fields=item_name,brand_name,item_id,nf_calories&appId=7609e232&appKey=0a249bb0ad1fc18455fde567706ebba7'

		$.getJSON(nutritionixUrl, function(data) {
			var responseArray = data.hits;
			for (var i = 0; i < responseArray.length; i++) {
				var searchResult = {};
				searchResult.name = responseArray[i].fields.item_name;
				searchResult.brand = responseArray[i].fields.brand_name;
				searchResult.calories = responseArray[i].fields.nf_calories;
				searchResult.selected = false;
				searchResults.push(searchResult);
			}

			new app.ListView(searchResults);
		});

	});

});


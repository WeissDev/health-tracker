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
		checked: false
	},


    addChecked: function() {
    	this.set({checked: true});
    	console.log(this.toJSON());
    }
});

/**
 * COLLECTION
 */

var app = app || {};

app.FoodCollection = Backbone.Collection.extend({
	/** Reference to this collections model */
	model: app.FoodModel,

	completed: function() {
		return this.filter(function(item) {
			return item.get('checked');
		});
	},

	// Filter down the list to only todo items that are still not finished.
	remaining: function() {
		return this.without.apply( this, this.checked() );
	}

});

var app = app || {};
/** Collection for selected food items */
app.SelectedCollection = Backbone.Collection.extend({

	model: app.FoodModel
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
		'click .check': 'addToSelected'
	},

	render: function() {
		/** this.el refers to ul#search-results */
		this.$el.append( this.template(this.model.attributes) );

		return this;
	},

	addToSelected: function() {
		this.model.addChecked();
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
				searchResult.checked = false;
				searchResults.push(searchResult);
			}

			new app.ListView(searchResults);
		});

	});

});


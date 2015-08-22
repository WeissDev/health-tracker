var app = app || {};

/** View for users list of food items */
app.AppView = Backbone.View.extend({

	el: '#health-tracker',

	template: _.template($('#stats-template').html()),

	events: {
		'click #search-btn': 'getJson',
		'click #clear-btn': 'clearResults'
	},

	/**
	 * Setup event listeners for the collections on initialize
	 * Updates each view when models are added to each collection
	 * respectively.
	 */
	initialize: function() {
		this.listenTo(app.FoodCollection, 'add', this.addResponse);
		this.listenTo(app.SelectedCollection, 'add', this.addOne);
		this.listenTo(app.SelectedCollection, 'reset', this.addAll);
		this.listenTo(app.SelectedCollection, 'all', this.render);

		app.FoodCollection.fetch();
		app.SelectedCollection.fetch();
	},

	render: function() {
		var remaining = app.SelectedCollection.length;
		var totalCalories = 0;
		app.SelectedCollection.forEach(function(item) {
			totalCalories += item.get('calories');
		});

		if (app.SelectedCollection.length) {
			$('#footer').show();
			$('#footer').html(this.template({
				remaining: remaining,
				totalCalories: totalCalories
			}));
		} else {
			$('#footer').hide();
		}
	},

	/**
	 * Receives an item selected by the user an appends it
	 * to the selected food view.
	 */
	addOne: function(item) {
		var selected = new app.SelectedFoodView({
			model: item
		});
		$('#user-select').append( selected.render().el );
	},

	/**
	 * Renders all items in SelectedCollection which are stored in localStorage
	 */
	addAll: function() {
		this.$('#user-select').html('');
		app.SelectedCollection.each(this.addOne, this);
	},

	addResponse: function(item) {
		var received = new app.ResultsView({
			model: item
		});
		$('#search-results').append( received.render().el );
	},

	/** AJAX GET Request */
	getJson: function() {
		$('#search-results').empty();
		var searchTerm = $('#search-bar').val()
		var nutrionixUrl = 'https://api.nutritionix.com/v1_1/search/' + searchTerm + '?results=0:20&fields=item_name,brand_name,item_id,nf_calories&appId=7609e232&appKey=0a249bb0ad1fc18455fde567706ebba7'
		$.ajax({
			method: 'GET',
			url: nutrionixUrl,
			dataType: 'json',
			success: function(data) {
				var responseArray = data.hits;
				console.log(responseArray);
				for (var i = 0; i < responseArray.length; i++) {
					var resultItem = new app.FoodModel({
						name: responseArray[i].fields.item_name,
						brand: responseArray[i].fields.brand_name,
						calories: responseArray[i].fields.nf_calories,
						index: i
					});
					console.log(responseArray[i].fields.nf_calories);
					app.FoodCollection.create(resultItem);
				} // end for loop

			},
			error: function() {
				$('#search-results').append('<p>Couldn\'t get Nutritionix data. Check your internet connection or try again later.</p>');
			}
		});
	},

	clearResults: function() {
		_.invoke(app.FoodCollection.toArray(), 'destroy');
		this.$('#search-bar').val('');
		return false;
	}

});
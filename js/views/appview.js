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

	/**
	 * Calculates the total amount of calories in the selected collection
	 * and appends it to the page
	 * Invokes the intakeCanvas function which renders the charts based
	 * on total calories
	 */
	render: function() {
		var remaining = app.SelectedCollection.length;
		var totalCalories = 0;
		app.SelectedCollection.forEach(function(item) {
			totalCalories += item.get('calories');
		});

		if (app.SelectedCollection.length) {
			$('#stats').show();
			$('#stats').html(this.template({
				remaining: remaining,
				totalCalories: totalCalories
			}));
		} else {
			$('#stats').hide();
		}
		this.intakeCanvas(totalCalories);
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
				for (var i = 0; i < responseArray.length; i++) {
					var resultItem = new app.FoodModel({
						name: responseArray[i].fields.item_name,
						brand: responseArray[i].fields.brand_name,
						calories: responseArray[i].fields.nf_calories,
						index: i
					});
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
	},

	intakeCanvas: function(total) {

	    var barDataWeek = {
	        labels : ['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday'],
	        datasets : [
	            {
	                fillColor : "#48A497",
	                strokeColor : "#48A4D1",
	                data : [0,0,0,0,0,0,0]
	            }

	        ]
	    }

	    switch (new Date().getDay()) {
	        case 0:
	            barDataWeek.datasets[0].data[6] = total;
	            break;
	        case 1:
	            barDataWeek.datasets[0].data[0] = total;
	            break;
	        case 2:
	            barDataWeek.datasets[0].data[1] = total;
	            break;
	        case 3:
	            barDataWeek.datasets[0].data[2] = total;
	            break;
	        case 4:
	            barDataWeek.datasets[0].data[3] = total;
	            break;
	        case 5:
	            barDataWeek.datasets[0].data[4] = total;
	            break;
	        case 6:
	            barDataWeek.datasets[0].data[5] = total;
	            break;
	    }

	    var intakeWeekly = document.getElementById('bar-chart-weekly').getContext('2d');
	    new Chart(intakeWeekly).Bar(barDataWeek);


	    var barDataMonth = {
	        labels : ['January','February','March','April','May','June','July','August','September','October','November','December'],
	        datasets : [
	            {
	                fillColor : "#48A497",
	                strokeColor : "#48A4D1",
	                data : [0,0,0,0,0,0,0,0,0,0,0,0]
	            }
	        ]
	    }

	    switch (new Date().getMonth()) {
	        case 0:
	            barDataMonth.datasets[0].data[0] = total;
	            break;
	        case 1:
	            barDataMonth.datasets[0].data[1] = total;
	            break;
	        case 2:
	            barDataMonth.datasets[0].data[2] = total;
	            break;
	        case 3:
	            barDataMonth.datasets[0].data[3] = total;
	            break;
	        case 4:
	            barDataMonth.datasets[0].data[4] = total;
	            break;
	        case 5:
	            barDataMonth.datasets[0].data[5] = total;
	            break;
	        case 6:
	            barDataMonth.datasets[0].data[6] = total;
	            break;
	        case 7:
	            barDataMonth.datasets[0].data[7] = total;
	            break;
	        case 8:
	            barDataMonth.datasets[0].data[8] = total;
	            break;
	        case 9:
	            barDataMonth.datasets[0].data[9] = total;
	            break;
	        case 10:
	            barDataMonth.datasets[0].data[10] = total;
	            break;
	        case 11:
	            barDataMonth.datasets[0].data[11] = total;
	            break;
	    }

	    var intakeMonthly = document.getElementById('bar-chart-monthly').getContext('2d');
	    new Chart(intakeMonthly).Bar(barDataMonth);
	}

});
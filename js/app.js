/**
 * MAIN APP
 */

var app = app || {};

$(function() {

	new app.AppView()

/*
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
				searchResults.push(searchResult);
			}
			new app.AppView(searchResults);
		});

	});*/

});
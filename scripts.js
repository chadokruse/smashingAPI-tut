$(document).ready(function() {

	//This is to remove the validation message if no poster image is present
	$('#term').focus(function() {
		var full = $("#poster").has("img").length ? true : false;
		if (full === false) {
			$('#poster').empty();
		}
	});
	
	//function definition
	var getPoster = function() {
	
			//Grab the movie title and store it in a variable
			var film = $('#term').val();
			
				//Check if the user has entered anything
				if (film === '') {
			
					//If the input field was empty, display a message
					$('#poster').html("<h2 class='loading'>Ha! We haven't forgotten to validate the form! Please enter something.</h2>");
				
				} else {
			
					//They must have entered a value, carry on with API call, first display a loading message to notify the user of activity
					$('#poster').html("<h2 class='loading'>Your poster is on its way!</h2>");
				
					//The original v2.1 API call
					//$.getJSON("http://api.themoviedb.org/2.1/Movie.search/en/json/fb565d74e9408068a827dcd87e0eb7d5/" + film + "?callback=?", function(json) {
				
					$.getJSON("http://api.themoviedb.org/3/search/movie?api_key=fb565d74e9408068a827dcd87e0eb7d5&language=en&query=" + film + "&callback=?", function(json) {
				
						//TMDb API v3 no longer provides the "Nothing found" message, so we need to change our if statement
						if (json.results.length !== 0) {
							console.log(json);
					
							//Display the poster and a message announcing the result
							$('#poster').html('<h2 class="loading">Well, gee whiz! We found you a poster, skip!</h2><img id="thePoster" src="http://cf2.imgobject.com/t/p/w500' + json.results[0].poster_path + '" />');
							
							//Here's the original v2.1 output code
							//$('#poster').html('<h2 class="loading">Well gee whiz, we found you a poster skip!</h2><img id="thePoster" src=' + json[0].posters[0].image.url + ' />');
							
						} else {
						
							//The original v2.1 API call for when no results were found
							//$.getJSON("http://api.themoviedb.org/2.1/Movie.search/en/json/fb565d74e9408068a827dcd87e0eb7d5/goonies?callback=?", function(json) {
							$.getJSON("http://api.themoviedb.org/3/search/movie?api_key=fb565d74e9408068a827dcd87e0eb7d5&language=en&query=goonies&callback=?", function(json) {
									console.log(json);

									$('#poster').html('<h2 class="loading">We\'re afraid nothing was found for that search, we presume you were trying to search for The Goonies?</h2><img id="thePoster" src="http://cf2.imgobject.com/t/p/w500' + json.results[0].poster_path + '" />');
									
									//Here's the original v2.1 output code
									//$('#poster').html('<h2 class="loading">We\'re afraid nothing was found for that search, we presume you were trying to search for The Goonies?</h2><img id="thePoster" src=' + json[0].posters[2].image.url + ' />');

							});
						}
				});
			}
			return false;
		}
	$('#search').click(getPoster);
	$('#term').keyup(function(event) {
		if (event.keyCode == 13) {
			getPoster();
		}
	});
});
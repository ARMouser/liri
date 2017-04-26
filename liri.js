var keys = require("./keys.js");
var tkey = keys.twitterKeys;
var command = process.argv[2];
brains()

function brains(z){
	switch (command) {
		case "my-tweets":
		twitter()
		break;

		case "spotify-this-song":
		var song = parseThat()
		spotify(song)
		break;

		case "movie-this":
		var movie = parseThat()
		omdb(movie)
		break;

		case "do-what-it-says":
		readMe()
		break;
	}
}

function twitter(){
	var twits = require('twitter');
	var tweet = new twits(tkey)
	tweet.get('statuses/home_timeline', function(error, response){
		if (error) throw error;
		for (var i = 0; i < 10; i++) {
			var text = response[i].text;
			var at = response[i].created_at;
			console.log("Tweet: " + text + " at " + at)
		}	
	})
}

function omdb(mov){
	var mov = parseThat();
	var request = require("request");
	request("http://www.omdbapi.com/?t=" + mov + "&y=&plot=short&r=json&tomatoes=true", function(error, response, body) {
  		if (!error && response.statusCode === 200) {
    	console.log("Title: " + JSON.parse(body).Title);
    	console.log("Year: " + JSON.parse(body).Year);
    	console.log("IMDB Rating: " + JSON.parse(body).imdbRating);
    	console.log("Country: " + JSON.parse(body).Country);
    	console.log("Language: " + JSON.parse(body).Language);
    	console.log("Plot: " + JSON.parse(body).Plot);
    	console.log("Actors: " + JSON.parse(body).Actors);
    	console.log("Rotten Tomatoes: " + JSON.parse(body).tomatoURL);
  		}
	});
}

function spotify(song){
	var spotify = require('spotify');
	spotify.search({ type: 'track', query: song}, function(err, data) {
    	if ( err ) {
        	console.log('Error occurred: ' + err);
        	return;
    	} else { 
    		console.log("Artist: " + data.tracks.items[0].album.artists[0].name)
    		console.log("Song's Name: " + data.tracks.items[0].name)
    		console.log("Link: " + data.tracks.items[0].album.external_urls.spotify)
    		console.log("Album: " + data.tracks.items[0].album.name)
    	}
	});
}

function parseThat(){
	var query = "";
	for (var i = 3; i < process.argv.length; i++) {
		query += process.argv[i] + "+"
	} return query
}

function parseThis(z){
	var read = z.split(" ");
	console.log(read)
	var query = "";
 	for (var i = 0; i < read; i++){
 		query += read[i] + "+"
 	} return query
}

function readMe(){
	var fs = require("fs");
	fs.readFile("random.txt", "utf8", function(error, data) {
  	var dataArr = data.split(",");
  	var test = parseThis(dataArr[1])
  	console.log(test)
 //  	switch (dataArr[0]) {
	// 	case "my-tweets":
	// 	twitter()
	// 	break;

	// 	case "spotify-this-song":
	// 	var song = parseThis(dataArr[1]);
	// 	spotify(song)
	// 	break;

	// 	case "movie-this":
	// 	var movie = parseThis(dataArr[1])
	// 	omdb()
	// 	break;

	// 	case "do-what-it-says":
	// 	readMe()
	// 	break;
	// }
	})
}
// Make a .gitignore file and add the following lines to it.
// node_modules
// .DS_Store
// Make a JavaScript file named keys.js. Do Not add this file to the .gitignore. This would be a good thing to do in the real world, but it makes grading this assignment a challenge.


// node liri.js my-tweets
// This will show your last 20 tweets and when they were created at in your terminal/bash window.


// if no song is provided then your program will default to
// "The Sign" by Ace of Base

// If the user doesn't type a movie in, the program will output data for the movie 'Mr. Nobody.'
// If you haven't watched "Mr. Nobody," then you should: http://www.imdb.com/title/tt0485947/
// It's on Netflix!

// node liri.js do-what-it-says
// Using the fs Node package, LIRI will take the text inside of random.txt and then use it to call one of LIRI's commands.
// It should run spotify-this-song for "I Want it That Way," as follows the text in random.txt.
// Feel free to change the text in that document to test out the feature for other commands.

require("dotenv").config(); // added dotenv
var Spotify = require('node-spotify-api');   //added spotify 

var keys = require("./keys.js"); 

var spotify = new Spotify(keys.spotify);

var fs = require("fs");

var axios = require('axios'); //added axios package.

var moment = require('moment');   // moment added.
moment().format();     

////////////////////////////////switch 
var command = process.argv[2]; 
var input = process.argv[3]; 

switch (command) {
    case "concert-this":
        concertThis(input);
        break;
    case "spotify-this-song":
        spotifySong(input);
        break;
    case "movie-this":
        movieThis(input);
        break;
    case "do-what-it-says":
        doThis(input);
        break;
};

/////////////////////// Concert This
function concertThis(input) {
    axios.get("https://rest.bandsintown.com/artists/" + input + "/events?app_id=codingbootcamp")
    .then(function(response) {    
        for (var i = 0; i < response.data.length; i++) {

            var datetime = response.data[i].datetime; 
            var dateArr = datetime.split('T'); 

            var concertResults = 
                "--------------------------------------------------------------------" +
                    "\nVenue Name: " + response.data[i].venue.name + 
                    "\nVenue Location: " + response.data[i].venue.city +
                    "\nDate of the Event: " + moment(dateArr[0], "MM-DD-YYYY"); 
            console.log(concertResults);
        }
    })
    .catch(function (error) {
        console.log(error);
    });
        

}
 ////////////////// Spotify Song
 function spotifySong(input) {
    spotify
    .search({ type: 'track', query: input })
    .then(function(response){
        if (response.tracks.total === 0) {
            errorConditionForSpotify();
        } else {
            console.log("Artist: " + response.tracks.items[0].artists[0].name);
            console.log("Track: " + response.tracks.items[0].name);
            console.log("Preview URL: " + response.tracks.items[0].preview_url);
            console.log("Album: " + response.tracks.items[0].album.name);
        }
    }).catch(function (error) {  
        console.log(error);
        console.log("No Results found. Showing results for 'The Sign' by Ace of Base");
  });
}


//////////////////// movie this
function movieThis(input) {
    if(!input){
        input = "mr nobody";
    }
    axios.get("https://www.omdbapi.com/?t=" + input + "&y=&plot=short&apikey=trilogy")
    .then(function(response) {
            var movieResults = 
                "--------------------------------------------------------------------" +
                    "\nMovie Title: " + response.data.Title + 
                    "\nYear of Release: " + response.data.Year +
                    "\nIMDB Rating: " + response.data.imdbRating +
                    "\nRotten Tomatoes Rating: " + response.data.Ratings[1].input +
                    "\nCountry Produced: " + response.data.Country +
                    "\nLanguage: " + response.data.Language +
                    "\nPlot: " + response.data.Plot +
                    "\nActors/Actresses: " + response.data.Actors;
            console.log(movieResults);
    })
    .catch(function (error) {
        console.log(error);
    });
    
}
/////////////////////////// do this
function doThis(input) {

    fs.readFile("random.txt", "utf8", function(error, data) {
        if (error) {
            return console.log(error);
        }
        var dataArr = data.split(',');
        spotifySong(dataArr[0], dataArr[1]);
    })
}
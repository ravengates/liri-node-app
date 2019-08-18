require("dotenv").config(); // added dotenv

var keys = require("./keys.js"); 

var spotify = new Spotify(keys.spotify);

var Spotify = require('node-spotify-api');   //added spotify 
var axios = require('axios'); //added axios package.

var moment = require('moment');   // moment added.
moment().format();     



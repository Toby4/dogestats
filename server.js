var http = require("http");
var https = require("https");
var mongojs = require("mongojs");

var host = "www.dogehouse.org"
var path = "/index.php?page=api&action=getuserstatus&api_key=32a6dca2fba947e60920efde5c6589bc0450043e061c26b4b55409c99e8587e3&id=9288";

var server = 8080;
var tick = 5000;

function data(response) {
	var json = "";

  	response.on("data", function(chunk) {
    	json += chunk;
  	});

  	response.on("end", function() {
  		var data = JSON.parse(json);
  		console.log(data["getuserstatus"]["data"]["hashrate"]);
  	});
}

function call(callback) {

	https.get({

		host: host,
		path: path,
		rejectUnauthorized: false

	}, function(res) {
		data(res);
		loop();
	}).on('error', function(e) {
  		console.error(e);
	});

}

function loop() {
	setTimeout(function() {
		call();
	}, tick);
}

call(); //go!
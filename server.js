var http = require("http");
var https = require("https");
var fs = require("fs");
var mongojs = require("mongojs");

var host = "www.dogehouse.org"
var path = "/index.php?page=api&action=getuserstatus&api_key=32a6dca2fba947e60920efde5c6589bc0450043e061c26b4b55409c99e8587e3&id=9288";

var port = 8080;
var tick = 60000;

function interface() {
	var server = http.createServer();
	server.on("request", function(request, response) {

		switch(request.url) {
			case "/":
			response.writeHead(200, {"Content-type":"text/html"});
			var file = "index.html";
			break;

			case "/client.js":
			response.writeHead(200, {"Content-type":"text/javascript"});
			var file = "client.js";
			break;

			case "/stats.json":
			response.writeHead(200, {"Content-type":"text/plain"});
			var code = json();

			default:
			response.writeHead(404);
		}

		if(file) {
			fs.readFile(file, function(err, data) {
				response.write(data);
				response.end();
				console.log(request.url + " - " + file);
			});
		} else {
			response.write(code);
			response.end();
			console.log(request.url + " - " + code);
		}

	});

	server.listen(port);
}

function json() {
	return "{}";
}

function call(callback) {
	https.get({

		host: host,
		path: path,
		rejectUnauthorized: false

	}, function(res) {
		var json = "";

	  	response.on("data", function(chunk) {
	    	json += chunk;
	  	});

	  	response.on("end", function() {
	  		var data = JSON.parse(json);
	  		console.log(data["getuserstatus"]["data"]["hashrate"]);
	  	});

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
interface();

console.log("dogestats is running!");
console.log("=====================");
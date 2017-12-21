var express = require('express');
var googlehome = require('./google-home-messages');
var bodyParser = require('body-parser');
var config = require('./config/settings.json');
var mytoken = config.mytoken;
var debug = config.debug;
const serverPort = config.port;


var app = express();

//var urlencodedParser = bodyParser.urlencoded({ extended: false });

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false })); 

//app.post('/google-home-messages', urlencodedParser, function (req, res) {
app.post('/google-home-messages', function (req, res) {
	res.setHeader('Content-Type', 'application/json');

	if (!req.body) return res.sendStatus(400)
		console.log(req.body);
		var text = req.body.text;
		var ipaddress = req.body.ipaddress
		var token = req.body.token
		if (!token || token === ""){
			res.send("Please set a token");
			if (debug === "true"){
				console.log("No Token is set");
			}
			return;
		}
		if (token != mytoken){
			res.send("Token didnt match");
			if (debug === "true"){
				console.log("Invalid Token");
			}
			return;
		}	
		if (text && ipaddress){
			res.send(ipaddress + ' will say: ' + text + '\n');
			googlehome.notify(text, ipaddress, function(res) {
			
			if (debug === "true"){
				console.log(res + " " + ipaddress);
			}
			});
		}else{
			res.send('Please POST "text=Hello Google Home"');
		}
})
app.listen(serverPort, function () {
	if (debug === "true"){
		console.log('Make a POST request to this device');
		console.log('example:');
		console.log('curl -X POST  -H "Content-Type: application/json" -d \'{"token":"4HTczfqeW2F346PXsLAREeMQPCMHdjWE","text":"Hello Google Home","ipaddres":"=192.168.1.148"}\' http://192.168.1.113:8092/google-home-messages');
	}
})

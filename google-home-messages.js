var Client = require('castv2-client').Client;
var DefaultMediaReceiver = require('castv2-client').DefaultMediaReceiver;
var googletts = require('google-tts-api');
var config = require('./config/settings.json');
var lang = config.lang;
var speed = config.speed;
var debug = config.debug;

var device = function(name) {
	device = name;
	return this;
}


var notify = function(message, deviceIP, callback) {
	if (debug === "true"){
		console.log('Address = ' + deviceIP + ', message = ' + message);
	}
	getSpeechUrl(message, deviceIP, function(res) {
		callback(res);
		});
}

var getSpeechUrl = function(text, host, callback) {
	googletts(text, lang, speed).then(function (url) {
		onDeviceUp(host, url, function(res){
			callback(res)
			});
		}).catch(function (err) {
			console.error(err.stack);
			});
}

var onDeviceUp = function(host, url, callback) {
	var client = new Client();
	client.connect(host, function() {
		client.launch(DefaultMediaReceiver, function(err, player) {
			var media = {
					contentId: url,
					contentType: 'audio/mp3',
					streamType: 'BUFFERED', // or LIVE
					};
			player.load(media, { autoplay: true }, function(err, status) {
					client.close();
					callback('Device notified');
					});
			});
	});

	client.on('error', function(err) {
		console.log('Error: %s', err.message);
		client.close();
		callback('error');
	});
}

exports.device = device;
exports.notify = notify;

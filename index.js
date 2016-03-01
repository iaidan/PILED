/*
 * PiLED v0.1.0
 * Created by Aidan Taylor - http://aidantaylor.net
 */

var exec = require('child_process').exec;
var restify = require('restify'),
fs = require('fs');

function execute(command, callback){
    exec(command, function(error, stdout, stderr){ callback(stdout); });
}

var rest = restify.createServer({
  //certificate: fs.readFileSync('path/to/server/certificate'),
  //key: fs.readFileSync('path/to/server/key'),
  name: 'PiLED',
});

rest.use(Restify.bodyParser());
rest.use(Restify.authorizationParser());
rest.use(Restify.queryParser());
rest.use(Restify.CORS());

var leds = [7, 0, 2, 1, 3, 4, 5, 6];

rest.get('/', function (req, res) {
    res.send('PiLED');
});

server.get('/led/:number', function(req, res) {
	if (leds.indexOf(req.prams.value) < 0) {
		res.send({
			"error": "LED does not exist"
		});

		return;
	}
	
	execute('gpio read ' + req.params.number, function(result) {
		res.send({
			"result": result
		});
	});
});

server.put('/led/:number', function(req, res) {
	if (leds.indexOf(req.prams.value) < 0) {
		res.send({
			"error": "LED does not exist"
		});

		return;
	}

	if (req.params.value == "on" || req.prams.value == true) {
		value = 1;
	} else if (req.prams.value == "off" || req.prams.value == false) {
		value = 0;
	} else {
		value = req.params.value;
	}

	execute('gpio mode ' + req.params.number + " output", null);
	execute('gpio write ' + req.params.number + " " + value, function(result) {
		res.send({
			"result": result
		});
	});
});

rest.listen(8080);

exports.Server = rest.server;
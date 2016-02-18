/*
 * PiLED v0.1.0
 * Created by Aidan Taylor - http://aidantaylor.net
 */

var Rfr = require('rfr');
var restify = require('restify'),
fs = require('fs');

var rest = restify.createServer({
  //certificate: fs.readFileSync('path/to/server/certificate'),
  //key: fs.readFileSync('path/to/server/key'),
  name: 'PiLED',
});

rest.use(Restify.bodyParser());
rest.use(Restify.authorizationParser());
rest.use(Restify.queryParser());
rest.use(Restify.CORS());

rest.get('/', function (req, res) {
    res.send('PiLED');
});

rest.listen(8080);

exports.Server = rest.server;
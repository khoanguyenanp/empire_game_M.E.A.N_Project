var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');

var app = express();
app.use(express.static(path.join(__dirname, 'client', 'static')));
app.use(express.static(path.join(__dirname, "client", "config")));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

require('./server/config/mongoose.js');

require('./server/config/routes.js')(app);

var port = 8000;
app.listen(port, function(){
	console.log('Working on: ', port);
})
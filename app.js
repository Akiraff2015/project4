const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const passport = require('passport');
const flash = require('connect-flash');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const session = require('express-session');

var app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// Coneect MongoDB
mongoose.connect('mongodb://localhost/inventory');


//Setup socket.io
// var server = require('http').Server(app);
// var io = require('socket.io')(server);

// Init middleware
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

//Setup Sessions
app.use(session({
	secret:'akira',
	saveUninitialized: false,
	resave: false
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

// TODO fix the static page, DONT import /bower_components!!!
//Setting directory to the path
app.use('/public', express.static(__dirname + '/public'));
app.use('/bower_components', express.static(__dirname + '/bower_components'));
app.use('/angular', express.static(__dirname + '/angular'));

//Setting up Passport local-strategy
require('./angular/controllers/passport')(passport);

//Routes directory
require('./routes/routes')(app, passport);
require('./routes/auth')(app, passport);
require('./routes/render/render')(app);

// API
require('./routes/api/board')(app);
require('./routes/api/ingredient')(app);
require('./routes/api/item')(app);
require('./routes/api/supplier')(app);
require('./routes/api/recipe')(app);
require('./routes/api/comment')(app);
require('./routes/api/order')(app);


app.listen(3000, function () {
	console.log('http://localhost:3000/');
});
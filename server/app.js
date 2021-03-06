if(!process.env.JWT_SECRET) {
  var env = require('./env.js');
}

var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var passport = require('passport');

// models
require('./models/CompanyInfo');
require('./models/ServerInfo');
require('./models/Users');

// passport configuration
require('./config/passport');

mongoose.connect('mongodb://localhost/meanCRM');

var routes = require('./routes/index');
var users = require('./routes/users');
var configuration = require('./routes/configuration');

var app = express();

// uncomment after placing your favicon in /public
app.use(favicon(path.join(__dirname, '../client', 'favicon.ico')));
app.use(express.static(path.join(__dirname, '../client')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
/* Initialize passport */
app.use(passport.initialize());

app.use('/', routes);
app.use('/users', users);
app.use('/configuration', configuration);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;

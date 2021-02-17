var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const hbs = require('hbs');
const mongoose = require('mongoose');
const passport = require('passport');
const passportSetup = require('./config/passport-setup');
require('dotenv').config();
const keys = require('./config/keys');
const cookieSession = require('cookie-session');

//Routers
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
const allArticlesRouter = require('./routes/all-articles');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
hbs.registerPartials("./views/partials");

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//set cookie session maxAge to be 1 day in milliseconds and encrypt keys with a cookie key (put in keys.js in session key)
app.use(cookieSession({ //time needs to be in milliseconds
  maxAge: 24 * 60 * 60 * 1000,
  keys: [keys.session.cookieKey]
}));


// Initialize Passport  
app.use(passport.initialize());
app.use(passport.session());

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/all-articles', allArticlesRouter);



// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;

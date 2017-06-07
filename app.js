var express = require('express');
var loadEnv = require('dotenv').config;
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var index = require('./routes/index');
var examRoutes = require('./routes/ExamRoutes');
var examAPI = require('./routes/ExamAPIRoutes');

// Load env
if (loadEnv().error)
  console.error("error loading env");

//DB Declarations
var mongoose = require('mongoose');
var dbHost = process.env.DB_HOST || 'mongodb://localhost/test-db-pfe'; //use given DB or create new one on you localhost
var app = express();

// Connect to db:
mongoose.Promise = global.Promise; //For hiding the "deprecated" warning
mongoose.connect(dbHost,function(err, next) {
  if (err) {
    console.error("Faild to load DB");
  } else {
    console.log(dbHost);
    console.log("Your awesome Database is connected");
  }
});
// If the connection throws an error
mongoose.connection.on('error',function (err) {
  console.log('Mongoose connection Warning: error: ' + err);
});

// When the connection is disconnected
mongoose.connection.on('disconnected', function () {
  console.log('Mongoose connection Warning: disconnected');
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use('/', index);
app.use('/exam', examRoutes);
app.use('/api/v1/exam', examAPI);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
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

const createError = require('http-errors');
const express = require('express');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, 'config/.env') });
const cookieParser = require('cookie-parser');
const logger = require('morgan');
let indexRouter = require('./routes/index');
let app = express();
let io = app.io = require('socket.io')();
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

// Connecting to the database
console.log(process.env.DB_PRODUCTION);
console.log(process.env.NODE_ENV);
mongoose.connect(process.env[`DB_${process.env.NODE_ENV}`.toUpperCase()], { useNewUrlParser: true }).then(() => {
  console.log('Successfully connected to the database');
}).catch(err => {
  console.log('Could not connect to the database. Exiting now...', err);
  process.exit();
});
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
app.use(logger('dev'));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use((req, res, next) => {
  req.io = io.of(req.path);
  console.log(req.path);
  next();
});
app.get('/favicon.ico', (req, res) => res.status(204));
app.use('/', indexRouter);
app.use(function (req, res, next) {
  next(createError(404));
});
app.use(function (err, req, res, next) {
  // error handler
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  // render the error page
  res.status(err.status || 500);

  res.render('error');
});

module.exports = app;

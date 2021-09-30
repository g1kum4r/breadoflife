var createError = require('http-errors');
var express = require('express');
var mongoose = require('mongoose');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var distributorsRouter = require('./routes/distributors');

var app = express();

mongoose.connect('mongodb://g1kumar:g1mongodb@cluster0-shard-00-00.w0apc.mongodb.net:27017,cluster0-shard-00-01.w0apc.mongodb.net:27017,cluster0-shard-00-02.w0apc.mongodb.net:27017/breadoflife?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true&w=majority');

// on mongodb connection
mongoose.connection.on('connected', () => {
  console.log("connected to mongodb");
});

mongoose.connection.on('error', (err) => {
  console.error("error while connecting to mongodb", err);
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/distributions', distributorsRouter);

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

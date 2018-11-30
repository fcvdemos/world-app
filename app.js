const express = require('express');
const path = require('path');
const logger = require('morgan');
const bodyParser = require('body-parser');
const appRoutes = require('./routes/main');
const ejs = require('ejs');
var compression = require('compression');

const app = express();

// compress all responses
app.use(compression());

// Setup View Engine
if(process.env.NODE_ENV === 'production') {
  app.set('view engine', 'ejs'); //specifies the engine we want to use
  app.engine('html', require('ejs').renderFile); //renders html files
  app.set('views', path.join(__dirname, 'views'));
}
else {
  app.set('view engine', 'html'); //specifies the engine we want to use
  app.engine('html', require('ejs').renderFile); //renders html files
  app.set('views', path.join(__dirname, 'views'));
}

app.use(logger('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use('/client', express.static(path.join(__dirname, 'client')));
app.use('/dist', express.static(path.join(__dirname, 'dist')));
app.use('/node_modules', express.static(path.join(__dirname, 'node_modules')));
app.use('/public', express.static(path.join(__dirname, 'public')));


app.use('', appRoutes);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  let err = new Error('Not Found');
  err.status = 404;
  // next(err);
  res.render('error');
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.json({
    message: err.message,
    error: err
  });
});

module.exports = app;

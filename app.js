const express = require('express');
const bodyParser = require('body-parser');
const app = express();

require('dotenv').config();

// lets set the port
let port = process.env.PORT || 3000;

// parse incoming requests
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// serve static files from /public
app.use(express.static(__dirname + '/public'));

// view engine setup
app.set('view engine', 'pug');
app.set('views', __dirname + '/views');

// include routes
var routes = require('./routes/index');
app.use('/', routes);

// catch 404 and forward to error handler
app.use( (req, res, next) => {
  var err = new Error('File Not Found');
  err.status = 404;
  next(err);
});

// error handler
// define as the last app.use callback
app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    code: err.status,
    error: {}
  });
});

// listen on port 3000

app.listen(port, () => {
  console.log('Ok, we are listening on port ' + port + '');
});
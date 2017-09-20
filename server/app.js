"use strict";

require('dotenv').config();

const express = require('express');
const ENV = process.env.NODE_ENV || "development";
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const knexConfig = require("./knexfile");
const knex = require("knex")(knexConfig[ENV]);
const knexLogger  = require('knex-logger');
const cors = require('cors');
const expressJWT = require('express-jwt');
const jwt = require('jsonwebtoken');
const request = require('request');
const methodOverride = require('method-override');

const index = require('./routes/index');
const users = require('./routes/users');
const login = require('./routes/login');
const register = require('./routes/register');
const filters = require('./routes/filters');
const favorites = require('./routes/favorites');
const map = require('./routes/map');

const app = express();

app.use(methodOverride('_method'));

const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({extended: true}));

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
// app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '../build')));

app.use(cors());

app.use(expressJWT({
  secret: 'CBFC',
  credentialsRequired: false,
  getToken: function fromHeaderOrQuerystring (req) {
    if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
        return req.headers.authorization.split(' ')[1];
    } else if (req.query && req.query.token) {
      return req.query.token;
    }
    return null;
  }
}));

app.use('/', index);
app.use('/users', users(knex));
app.use('/login', login(knex));
app.use('/register', register(knex));
app.use('/filters', filters(knex));
app.use('/favorites', favorites(knex));
app.use('/map', map(knex));
app.use('/favoritesmap', map(knex));

// // catch 404 and forward to error handler
// app.use(function(req, res, next) {
//   const err = new Error('Not Found');
//   err.status = 404;
//   next(err);
// });

// // error handler
// app.use(function(err, req, res, next) {
//   // set locals, only providing error in development
//   res.locals.message = err.message;
//   res.locals.error = req.app.get('env') === 'development' ? err : {};

//   // render the error page
//   res.status(err.status || 500);
//   res.render('error');
// });

module.exports = app;

'use strict';
require('./config/config');
require('./db/connection');

const app = require('express')();
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const { passport } = require('./passport-config');
const routes = require('./routes');
const logger = require('./logger');


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({
  secret: process.env.SECRET,
  resave: true,
  saveUninitialized:true
}));
app.use(passport.initialize());
app.use(passport.session());
app.use('/', routes);

app.listen(process.env.PORT, () => {
  logger.log('Started on port ', process.env.PORT);
})

module.exports = app;

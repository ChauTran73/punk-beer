'use strict';
require('./config/config');
require('./db/connection');
const { userController } = require('./controllers');

const app = require('express')();
const bodyParser = require('body-parser');
const logger = require('./logger');

app.use(bodyParser.json());

app.get('/', (req, res, next) => {
  console.log(req)
  res.send('Hello!');
})

app.post('/api/user', (req, res, next ) => {
  console.log(req.body);
  res.status(200).send({status: 'ok'})
})
app.get('/api/user/:email', userController.getUser);

app.listen(process.env.PORT, () => {
  console.log('Started on port ', process.env.PORT);
})

module.exports = app;

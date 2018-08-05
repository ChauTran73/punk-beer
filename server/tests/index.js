'use strict';
const chai = require('chai');
const expect = chai.expect;
const mongoose = require('mongoose');

require('../config/config');
require('../db/connection');

describe('Tests', () => {
  before((done) => {
    mongoose.connection.on('open',function (err) {  
      done();
    }); 
  })

  after(() => {
    mongoose.connection.dropDatabase()
    .then(() => {
      return mongoose.disconnect();
    })
    
  })

  require('./db/connection.test');
  require('./models/user.test');
})


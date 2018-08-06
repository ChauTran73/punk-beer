'use strict';
const chai = require('chai');
const expect = chai.expect;
const mongoose = require('mongoose');

require('../config/config');
require('../db/connection');

const { mem } = require('../cache');

describe('Tests', () => {
  before((done) => {
    mongoose.connection.on('open',function (err) {  
      done();
    }); 
  })

  after(async () => {
    await mongoose.connection.dropDatabase();
    await mongoose.disconnect();
    await mem.cache.flush();
    await mem.cache.quit();
  })

  require('./db/connection.test');
  require('./models/user.test');
  require('./cache/mem.test');
})


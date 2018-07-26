require('../config/config');
require('../db/connection');

const expect = require('chai').expect;
const mongoose = require('mongoose');

describe('MONGOOSE', () => {

  before((done) => {
    mongoose.connection.on('connected', done);
  });

  it('should have a connection to the db', () => {
    const { readyState } = mongoose.connection;
    expect(readyState).to.equal(1);
  })

  after((done) => {
    mongoose.disconnect()
    .then(done)
  })
})
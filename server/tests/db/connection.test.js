const chai = require('chai');
const expect = chai.expect;
const mongoose = require('mongoose');

describe('Mongoose', () => {

  it('should have a connection to the db', (done) => {
    const { readyState } = mongoose.connection;
    expect(readyState).to.equal(1);
    done();
  })

})
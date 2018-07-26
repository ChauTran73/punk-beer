require('../config/config');
require('../db/connection');

const chai = require('chai');
const expect = chai.expect;

const chaiAsPromised = require("chai-as-promised");
const mongoose = require('mongoose');
const User = require('../models/user');

chai.use(chaiAsPromised);

before((done) => {
  mongoose.connection.on('connected', done);
});

after((done) => {
  mongoose.disconnect()
  .then(done)
})

describe('Mongoose', () => {

  it('should have a connection to the db', () => {
    const { readyState } = mongoose.connection;
    expect(readyState).to.equal(1);
  })

})


describe('User', () => {

  before((done) => {
    User.remove({})
    .then(() => {
      return User.create({email: 'test@example.com', password: '$$$Password$$$'});
    })
    .then(() => { done() })
    .catch(done)

  })

  const goodUser = new User({email: 'good@email.com', password: '$Secret$Password'});

  it('should have a valid email', () => {
    const badUser = new User({email: 'asdasdsad', password: '123456'});
    return expect(badUser.save()).to.be.rejected;
  })

  it('should have an email with a min length of 4', () => {
    const badUser = new User({email: 'a@c', password: '123456'});
    return expect(badUser.save()).to.be.rejected;
  })

  it('should have a password with a min length of 6', () => {
    const badUser = new User({email: 'good@email.com', password: '12345'});
    return expect(badUser.save()).to.be.rejected;
  })

  it('should save', () => {
    return expect(goodUser.save()).to.be.fulfilled;
  })

  it('should have a unique email', () => {
    const badUser = new User({email: 'good@email.com', password: '$Secret$Password'});
    return expect(badUser.save()).to.be.rejected;
  }) 

  it('should be found in db', (done) => {
    User.findOne({email: 'good@email.com'})
    .then((doc) => {
      console.log(doc);
      done();
    })
  })


})
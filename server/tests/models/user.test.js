const chai = require('chai');
const expect = chai.expect;
const chaiAsPromised = require("chai-as-promised");
const mongoose = require('mongoose');
const User = require('../../models/user');

chai.use(chaiAsPromised);

describe('User', () => {

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


})
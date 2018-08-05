'use strict';
const chai = require('chai');
const expect = chai.expect;
const chaiAsPromised = require("chai-as-promised");
const mongoose = require('mongoose');
const User = require('../../models/user');

chai.use(chaiAsPromised);

describe('User', () => {
  let fbUser = {user_id: 'facebook|5b673226S0M3t35t'};
  it('should reject user with bad user_id', () => {
    return expect(new User({user_id: 'asadasddsad'})
      .save()).to.be.rejected;
  })

  it('should create user with valid Auth0 user_id', () => {
    return expect(new User({user_id: 'auth0|5b673226S0M3t35t'})
      .save()).to.eventually.have.property("_id");
  })

  it('should create user with valid Facebook user_id', () => {
    return expect(User(fbUser).save()).to.eventually.have.property("_id");
  })

  it('should reject user with a user_id that is not unique', () => {
    return expect(new User({user_id: 'auth0|5b673226S0M3t35t'})
      .save()).to.be.rejected;
  })

  it('should update favorites', (done) => {
    User.update(fbUser, {favorites: ["123", "456"]})
      .then((doc) => {
        expect(doc).to.deep.equal({ n: 1, nModified: 1, ok: 1 });
        return User.findOne(fbUser);
      })
      .then((user) => {
        expect(user.favorites).to.deep.equal(["123", "456"]);
        done();
      })
      .catch(done);
  })

})
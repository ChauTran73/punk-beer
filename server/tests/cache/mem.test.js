'use strict';
const chai = require('chai');
const expect = chai.expect;
const chaiAsPromised = require("chai-as-promised");
const { mem } = require('../../cache');

chai.use(chaiAsPromised);

describe('Cache', () => {
  
  describe('mem.cache.set', () => {
    it('should only accept an object value to set', () => {
      return expect(mem.cache.set('test', 'some string')).to.be.rejected;
    })
  
    it('should set a value to a given key', () => {
      return expect(mem.cache.set('test', {name: 'sean'})).to.eventually.equal(true);
    })
  })

  describe('mem.cache.get', () => {
    it('should get a value for a given key', () => {
      return expect(mem.cache.get('test')).to.eventually.deep.equal({name: 'sean'});
    })
  })

  /*
  describe('mem.cache.checkAndSet', () => {
    it('should only accepts keys that are urls', () => {
      return expect(mem.cache.checkAndSet('test')).to.be.rejected;
    })
    it('should request the key(url) and set if it\'s not in the cache', async() => {
      let url = 'https://httpbin.org/get';

      let check = await mem.cache.get(url);
      expect(check).to.be.null;

      let value = await mem.cache.checkAndSet(url)
      expect(value.url).to.equal('https://httpbin.org/get');
    })
  })
 */

})
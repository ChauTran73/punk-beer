'use strict';
const memjs = require('memjs');
const client = memjs.Client.create();
const axios = require('axios');
const isURL = require('validator/lib/isURL');

const cache = {
  set: (key, value) => {
    return new Promise((resolve, reject) => {

      if (value !== Object(value)) {
        const error = new Error('Cache values must be objects');
        reject(error);
        return;
      }

      const buff = Buffer.from(JSON.stringify(value));
      client.set(key, buff, {expires: 60 * 60}, (err, val) => {
        if (err) {
          reject(err);
        } else {
          resolve(val);
        }
      })
    })  
  },
  get: (key) => {

    return new Promise((resolve, reject) => {
      client.get(key, (err, buff) => {
        if (err) {
          reject(err);
        } else {
          let value = buff ? JSON.parse(Buffer.from(buff).toString()) : buff;
          resolve(value);
        }
      })
    })  
  },
  checkAndSet: async (key) => {

    let value = await cache.get(key);

    if (!value) {
      let { request, get } = cache._determineGetMethod(key);
      let { data } = await get(request);
      await cache.set(key, data);
      return data;
    } else {
      return value;
    }
  },
  _getHttp: async(request) => {
    return await axios.get(request);
  },
  _determineGetMethod: (key) => {

    if (/^http:/.test(key)) {
      let filteredKey = key.replace(/^http:/, "");
      return {
        request: filteredKey,
        get: cache._getHttp
      }
    }
  },
  flush: () => client.flush(),
  quit: () => client.quit()

}

module.exports = { cache };
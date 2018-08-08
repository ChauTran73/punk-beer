const { mem: { cache } } = require('../cache');

const BASE_URL = "https://api.punkapi.com/v2/beers";

const punkAPI = {
  getBeersByIds: async(ids) => {
    let idString = ids.join('|');
    let url = `${BASE_URL}?ids=${idString}`;
    
    return await punkAPI._request(url);
  },
  getBeerByID: async(id) => {
    let url = `${BASE_URL}/${id}`;
    return await punkAPI._request(url);
  },
  getBeersByQs: async(qs) => {
    let url = `${BASE_URL}?${qs}`;
    return await punkAPI._request(url);
  },
  _request: async(req) => {    
    let result = await cache.checkAndSet(`http:${req}`);
    return result;
  }
}

module.exports = { punkAPI };
'use strict';

const request = require('./utils/request');
const R = require('ramda');

function suggest (opts) {
  return new Promise(function (resolve, reject) {
    if (!opts && !opts.term) {
      throw Error('term missing');
    }

    const lang = opts.lang || 'en';
    const country = opts.country || 'us';

    const term = encodeURIComponent(opts.term);
    const options = Object.assign({      
      url: `https://clients1.google.com/complete/search?hl=${lang}&gl=${country}&output=toolbar&q=${term}`,
      method: 'GET',
      followAllRedirects: true
    }, opts.requestOptions);    
    
    request(options, opts.throttle)
      .then((res) => res.match(/(?<=data\=\")(.*?)(?=\s*\")/g))
      .then(function (res) {        
        resolve(res);
      })
      .catch(reject);
  });
}

module.exports = suggest;

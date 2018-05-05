import _ from 'lodash';
import Promise from 'bluebird';

export default class HttpService {
  fetchWithPromise(endpoint, options) {
    return new Promise((resolve, reject) => {
      fetch(endpoint, options)
        .then((response) => {
          if (response.ok) {
            return response;
          }
          return reject(new Error(`HttpRequest failed with ${response.status} ${response.url}`));
        })
        .then((response) => {
          const contentType = response.headers.get('content-type');
          if (contentType && contentType.startsWith('application/json')) {
            return response.json();
          }
          return response.text();
        })
        .then(resolve)
        .catch(reject);
    });
  }

  request(endpoint, method, payload, headers) {
    let reqHeaders = headers || {};
    if (!reqHeaders['Content-Type']) {
      reqHeaders = { ...reqHeaders, 'Content-Type': 'application/json' };
    }

    const options = { method, headers: reqHeaders };

    // Not all `payload` need to be `JSON.stringify` e.g. multipart/form-data.
    if (!_.isEmpty(payload)) {
      if (reqHeaders['Content-Type'] === 'application/json') {
        options.body = JSON.stringify(payload);
      } else {
        options.body = payload;
      }
    }
    return this.fetchWithPromise(endpoint, options);
  }

  get(endpoint, headers = {}) {
    return this.request(endpoint, 'get', {}, headers);
  }

  post(endpoint, payload = {}, headers = {}) {
    return this.request(endpoint, 'post', payload, headers);
  }

  put(endpoint, payload = {}, headers = {}) {
    return this.request(endpoint, 'put', payload, headers);
  }

  delete(endpoint, headers = {}) {
    return this.request(endpoint, 'delete', {}, headers);
  }
}

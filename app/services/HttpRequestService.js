import _ from 'lodash';
import superagent from 'superagent';
import Promise from 'bluebird';

class HttpRequestService {
  _request(endpoint, method, payload, headers) {
    const request = {
      get: superagent.get,
      post: superagent.post,
      put: superagent.put,
      delete: superagent.delete,
    }[method](endpoint);

    request.set('Content-Type', 'application/json');
    _.map(headers, (value, key) => {
      request.set(key, value);
    });

    if (_.includes(['post', 'put'], method) && !_.isEmpty(payload)) {
      request.send(payload);
    }

    return new Promise((resolve, reject) => {
      request.end((err, res) => {
        err ? reject(new Error(JSON.parse(res.text).error)) : resolve(res);
      });
    });
  }

  get(endpoint, headers = {}) {
    return this._request(endpoint, 'get', {}, headers);
  }

  post(endpoint, payload = {}, headers = {}) {
    return this._request(endpoint, 'post', payload, headers);
  }

  put(endpoint, payload = {}, headers) {
    return this._request(endpoint, 'put', payload, headers);
  }
}

export default new HttpRequestService();

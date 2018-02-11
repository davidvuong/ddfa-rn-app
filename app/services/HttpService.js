// @flow
import _ from 'lodash';
import Promise from 'bluebird';

type Payload = {};
type Headers = {};

export default class HttpService {
  fetchWithPromise(endpoint: string, options: *): Promise<*> {
    return new Promise((resolve: *, reject: *) => {
      fetch(endpoint, options)
        .then((response: *) => {
          if (response.ok) {
            return response;
          }
          return reject(new Error(`HttpRequest failed with ${response.status} ${response.url}`));
        })
        .then((response: *) => {
          if (response.headers.get('content-type').startsWith('application/json')) {
            return response.json();
          }
          return response.text();
        })
        .then(resolve)
        .catch(reject);
    });
  }

  request(endpoint: string, method: string, payload: Payload, headers: ?Headers): Promise<*> {
    let reqHeaders: Object = headers || {};
    if (!reqHeaders['Content-Type']) {
      reqHeaders = { ...reqHeaders, 'Content-Type': 'application/json' };
    }

    const options: Object = { method, headers: reqHeaders };

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

  get(endpoint: string, headers: ?Headers): Promise<*> {
    return this.request(endpoint, 'get', {}, headers);
  }

  post(endpoint: string, payload: Payload = {}, headers: ?Headers): Promise<*> {
    return this.request(endpoint, 'post', payload, headers);
  }

  put(endpoint: string, payload: Payload = {}, headers: ?Headers): Promise<*> {
    return this.request(endpoint, 'put', payload, headers);
  }

  delete(endpoint: string, headers: ?Headers): Promise<*> {
    return this.request(endpoint, 'delete', {}, headers);
  }
}

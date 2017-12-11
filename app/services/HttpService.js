// @flow
import _ from 'lodash';
import Promise from 'bluebird';

type Payload = {};
type Headers = {};

export default class HttpService {
  request(endpoint: string, method: string, payload: Payload, headers: Headers): Promise<*> {
    return new Promise((resolve: *, reject: *) => {
      const options: Object = {
        method,
        headers: { ...headers, 'Content-Type': 'application/json' },
      };
      if (_.includes(['post', 'put'], method)) {
        options.body = JSON.stringify(payload);
      }

      fetch(endpoint, options)
        .then((response: *) => {
          if (response.ok) {
            return response;
          }
          return reject(new Error(`Authentication failed with ${response.status} ${response.url}`));
        })
        .then((response: *) => {
          return resolve(response.json());
        })
        .catch((error: Error) => {
          return reject(error);
        });
    });
  }

  get(endpoint: string, headers: Headers = {}) {
    return this.request(endpoint, 'get', {}, headers);
  }

  post(endpoint: string, payload: Payload = {}, headers: Headers = {}) {
    return this.request(endpoint, 'post', payload, headers);
  }

  put(endpoint: string, payload: Payload = {}, headers: Headers = {}) {
    return this.request(endpoint, 'put', payload, headers);
  }
}

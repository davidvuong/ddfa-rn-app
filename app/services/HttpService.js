// @flow
import _ from 'lodash';
import Promise from 'bluebird';

type Payload = {};
type Headers = {
  Authorization: ?string,
  'Content-Type': ?string,
};

export default class HttpService {
  fetchWithPromise(endpoint: string, options: *): Promise<*> {
    return new Promise((resolve: *, reject: *) => {
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

  request(endpoint: string, method: string, payload: Payload, headers: ?Headers): Promise<*> {
    let reqHeaders = headers || {
      Authorization: null,
      'Content-Type': null,
    };
    if (!reqHeaders['Content-Type']) {
      reqHeaders = { ...reqHeaders, 'Content-Type': 'application/json' };
    }

    const options: Object = { method, headers };

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
}

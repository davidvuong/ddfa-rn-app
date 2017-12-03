// @flow

type Payload = {

};

type Headers = {

};

export default class HttpService {
  request(endpoint: string, method: string, payload: Payload, headers: Headers) {
    return fetch(endpoint, {
      method,
      body: JSON.stringify(payload),
      headers: { ...headers, 'Content-Type': 'application/json' },
    })
      .then((response: *) => {
        if (response.ok) {
          return Promise.resolve(response);
        }
        return Promise.reject(new Error(`${response.statusText}: ${response.status}`));
      }).then((response: *) => {
        return response.json();
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

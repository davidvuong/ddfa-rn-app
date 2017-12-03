import request from 'request-promise';

export default class HttpRequestService {
  DEFAULT_RESPONSE_TIMEOUT = 8000; // 8 seconds.

  _request(endpoint, method, payload, headers) {
    return request({
      method,
      url: endpoint,
      json: true,
      headers: { ...headers, 'Content-Type': 'application/json' },
      body: payload,
      encoding: null,
      timeout: this.DEFAULT_RESPONSE_TIMEOUT,
    });
  }

  get(endpoint, headers = {}) {
    return this._request(endpoint, 'get', {}, headers);
  }

  post(endpoint, payload = {}, headers = {}) {
    return this._request(endpoint, 'post', payload, headers);
  }

  put(endpoint, payload = {}, headers = {}) {
    return this._request(endpoint, 'put', payload, headers);
  }
}

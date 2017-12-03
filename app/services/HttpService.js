import request from 'request-promise';

export default class HttpRequestService {
  DEFAULT_RESPONSE_TIMEOUT = 8000; // 8 seconds.

  request(endpoint, method, payload, headers) {
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
    return this.request(endpoint, 'get', {}, headers);
  }

  post(endpoint, payload = {}, headers = {}) {
    return this.request(endpoint, 'post', payload, headers);
  }

  put(endpoint, payload = {}, headers = {}) {
    return this.request(endpoint, 'put', payload, headers);
  }
}

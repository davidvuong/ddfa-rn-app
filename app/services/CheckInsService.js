import Promise from 'bluebird';
import request from './HttpRequestService';

class CheckInService {
  initialize(host, token) {
    this.host = host;
    this.headers = { 'Authorization': token };
  }

  checkIn(latitude, longitude, address, name) {
    const endpoint = `${this.host}/check-ins`;
    const payload = { latitude, longitude, address, name };

    return Promise((resolve, reject) => {
      request.post(endpoint, payload, this.headers).then((res) => {
        resolve(res.body);
      }, reject);
    });
  }
}

export default new CheckInService();

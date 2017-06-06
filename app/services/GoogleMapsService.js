import Promise from 'bluebird';
import request from './HttpRequestService';

class GoogleMapsService {
  initialize(host, token) {
    this.host = host;
    this.headers = {
      'Authorization': token,
    };
  }

  getNearby(latitude, longitude, radius) {
    const endpoint = `${this.host}/vendor/google-maps/nearby`;
    const query = `latitude=${latitude}&longitude=${longitude}&radius=${radius}`;

    return new Promise((resolve, reject) => {
      request.get(`${endpoint}?${query}`, this.headers).then((response) => {
        resolve(response.body.places || []);
      }, reject);
    });
  }
}

export default new GoogleMapsService();

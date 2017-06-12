import Promise from 'bluebird';

class GoogleMapsService {
  initialize(host, authenticationService, httpService) {
    this.host = host;
    this.authenticationService = authenticationService;
    this.http = httpService;
  }

  getNearby(latitude, longitude, radius) {
    const endpoint = `${this.host}/vendor/maps/nearby`;
    const headers = this.authenticationService.getAuthenticationHeader();
    const query = `latitude=${latitude}&longitude=${longitude}&radius=${radius}`;

    return new Promise((resolve, reject) => {
      this.http.get(`${endpoint}?${query}`, headers).then((response) => {
        resolve(response.body.places || []);
      }, reject);
    });
  }

  reverseGeocode(latitude, longitude) {
    const endpoint = `${this.host}/vendor/maps/reverse-geocode`;
    const headers = this.authenticationService.getAuthenticationHeader();
    const query = `latitude=${latitude}&longitude=${longitude}`;

    return new Promise((resolve, reject) => {
      this.http.get(`${endpoint}?${query}`, headers).then((response) => {
        resolve(response.body.places[0] || null);
      }, reject);
    });
  }
}

export default new GoogleMapsService();

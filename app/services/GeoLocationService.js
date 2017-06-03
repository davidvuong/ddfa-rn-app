import Promise from 'bluebird';
import Permissions from 'react-native-permissions';

export class LocationAccessUnauthorized extends Error {}

class GeoLocationService {
  promptLocationAccess() {
    return new Promise((resolve, reject) => {
      Permissions.requestPermission('location').then((permission) => {
        permission === 'authorized' ?
          resolve() : reject(new LocationAccessUnauthorized('location access denied'));
      }, reject);
    });
  }

  getCurrentLocation() {
    const options = {
      enableHighAccuracy: true,
      timeout: 20000,
      maximumAge: 1000
    };
    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(resolve, reject, options);
    });
  }
}

export default new GeoLocationService();

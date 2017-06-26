import Promise from 'bluebird';
import Permissions from 'react-native-permissions';

import map from 'lodash/map';
import cloneDeep from 'lodash/cloneDeep';
import sortBy from 'lodash/sortBy';

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

  calculateRegionDelta(latitude, longitude, distance = 500) {
    distance = distance / 2;
    const circumference = 40075;
    const oneDegreeOfLatitudeInMeters = 111.32 * 1000;
    const angularDistance = distance / circumference;

    const latitudeDelta = distance / oneDegreeOfLatitudeInMeters;
    const longitudeDelta = Math.abs(Math.atan2(
      Math.sin(angularDistance) * Math.cos(latitude),
      Math.cos(angularDistance) - Math.sin(latitude) * Math.sin(latitude)
    ));
    return { latitude, longitude, latitudeDelta, longitudeDelta };
  }

  _deg2rad(deg) {
    return deg * (Math.PI / 180);
  }

  _calculateDistanceBetween(lat1, lng1, lat2, lng2) {
    const R = 6371; // Radius of the earth in km
    const dLat = this._deg2rad(lat2 - lat1);  // deg2rad below
    const dLon = this._deg2rad(lng2 - lng1);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(this._deg2rad(lat1)) * Math.cos(this._deg2rad(lat2)) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const d = R * c; // Distance in km
    return d;
  }

  sortByDistanceBetween(places, latitude, longitude) {
    const parsedPlaces = map(places, (p) => {
      const distanceBetween = this._calculateDistanceBetween(
        p.latitude, p.longitude, latitude, longitude
      );
      return { ...cloneDeep(p), distanceBetween };
    });
    return sortBy(parsedPlaces, 'distanceBetween');
  }

  getCurrentLocation() {
    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition((position) => {
        resolve(this.calculateRegionDelta(
          position.coords.latitude,
          position.coords.longitude
        ));
      }, reject);
    });
  }
}

export default new GeoLocationService();

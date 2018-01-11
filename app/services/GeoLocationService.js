// @flow

export type RegionDelta = {
  latitude: number,
  latitudeDelta: number,
  longitude: number,
  longitudeDelta: number,
};

export class GeoLocationService {
  calculateRegionDelta(latitude: number, longitude: number, distance: number = 500): RegionDelta {
    const d = distance / 2;
    const circumference = 40075;
    const oneDegreeOfLatitudeInMeters = 111.32 * 1000;
    const angularDistance = d / circumference;

    const latitudeDelta = d / oneDegreeOfLatitudeInMeters;
    const longitudeDelta = Math.abs(Math.atan2(
      Math.sin(angularDistance) * Math.cos(latitude),
      Math.cos(angularDistance) - Math.sin(latitude) * Math.sin(latitude), // eslint-disable-line no-mixed-operators
    ));
    return { latitude, longitude, latitudeDelta, longitudeDelta };
  }
}

export default new GeoLocationService();

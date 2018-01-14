// @flow
import * as React from 'react';
import MapView from 'react-native-maps';

import GeoLocationService from '../../../../services/GeoLocationService';
import Styles from './Styles';

type Props = {
  latitude: number,
  longitude: number,
};

type State = {};

export default class CheckInDetailMap extends React.Component<Props, State> {
  render() {
    const { latitude, longitude } = this.props;
    const delta = GeoLocationService.calculateRegionDelta(latitude, longitude);

    return (
      <MapView
        pitchEnabled={false}
        toolbarEnabled={true}
        moveOnMarkerPress={false}
        initialRegion={{
          latitude,
          longitude,
          latitudeDelta: delta.latitudeDelta,
          longitudeDelta: delta.longitudeDelta,
        }}
        style={Styles.mapView}
      >
        <MapView.Marker coordinate={{ latitude, longitude }} />
      </MapView>
    );
  }
}

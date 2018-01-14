// @flow
import * as React from 'react';
import MapView from 'react-native-maps';

import GeoLocationService from '../../services/GeoLocationService';
import Styles from './Styles';

type Props = {
  latitude: number,
  longitude: number,
};

type State = {};

export default class GenericStaticMap extends React.Component<Props, State> {
  render() {
    const { latitude, longitude } = this.props;
    const delta = GeoLocationService.calculateRegionDelta(latitude, longitude);

    return (
      <MapView
        zoomEnabled={false}
        rotateEnabled={false}
        scrollEnabled={false}
        pitchEnabled={false}
        toolbarEnabled={false}
        moveOnMarkerPress={false}
        cacheEnabled={true}
        loadingEnabled={true}
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

import * as React from 'react';
import MapView from 'react-native-maps';

import GeoLocationService from '../../services/GeoLocationService';
import Styles from './Styles';

const GenericStaticMap = ({ latitude, longitude }) => {
  if (!latitude || !longitude) { return null; }
  const delta = GeoLocationService.calculateRegionDelta(latitude, longitude);
  return (
    <MapView
      zoomEnabled={false}
      rotateEnabled={false}
      scrollEnabled={false}
      pitchEnabled={false}
      toolbarEnabled={false}
      moveOnMarkerPress={false}
      cacheEnabled
      loadingEnabled
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
};

export default GenericStaticMap;

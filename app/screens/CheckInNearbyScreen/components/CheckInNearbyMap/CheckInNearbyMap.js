import _ from 'lodash';
import * as React from 'react';
import MapView from 'react-native-maps';

import GeoLocationService from '../../../../services/GeoLocationService';
import Styles from './Styles';

const CheckInDetailMap = ({ latitude, longitude }) => {
  const delta = GeoLocationService.calculateRegionDelta(latitude, longitude);

  // When `latitude` and `longitude` changes, force React to re-render MapView.
  //
  // @see: https://github.com/react-community/react-native-maps/issues/283
  return (
    <MapView
      key={`${latitude}${longitude}`}
      pitchEnabled={false}
      toolbarEnabled
      moveOnMarkerPress={false}
      loadingEnabled
      initialRegion={{
        latitude,
        longitude,
        latitudeDelta: delta.latitudeDelta,
        longitudeDelta: delta.longitudeDelta,
      }}
      style={Styles.mapView}
    >
      <MapView.Marker pinColor="red" coordinate={{ latitude, longitude }} />
      {_.map(this.props.nearbyCheckIns, (checkIn) => {
          return <MapView.Marker
            key={checkIn.id}
            pinColor="orange"
            title={checkIn.name}
            description={`${(checkIn.distance / 1000).toFixed(2)}km away`}
            coordinate={{ latitude: checkIn.latitude, longitude: checkIn.longitude }} />;
      })}
    </MapView>
  );
};

export default CheckInDetailMap;

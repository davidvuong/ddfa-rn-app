import React, { Component } from 'react';
import _ from 'lodash';

import {
  View,
  ListView,
  Spinner,
  Row,
  Button,
} from '@shoutem/ui';
import {
  Text,
  Subtitle,
  Caption,
} from '@shoutem/ui';
import { Icon as UIIcon } from '@shoutem/ui';

import { View as RNView, StatusBar } from 'react-native';

import MapView from 'react-native-maps';
import GeoLocationService from '../../services/GeoLocationService';
import GoogleMapsService from '../../services/GoogleMapsService';

import navigationOptions from './NavigationOptions';
import styles from './Styles';

export default class SetLocationScreen extends Component {
  static navigationOptions = navigationOptions;

  CURRENT_POSITION_STATUS = {
    PENDING: 'PENDING',
    IN_PROGRESS: 'IN_PROGRESS',
    ERROR: 'ERROR',
    SUCCESS: 'SUCCESS',
  };
  PLACES_SEARCH_RADIUS = 200;

  constructor(props) {
    super(props);

    this.state = {
      currentPosition: null,
      currentPositionStatus: this.CURRENT_POSITION_STATUS.PENDING,
      places: null,
    };

    this.shouldShowSpinner = this.shouldShowSpinner.bind(this);
    this.setCurrentLocation = this.setCurrentLocation.bind(this);
    this.renderPlacesRow = this.renderPlacesRow.bind(this);
    this.renderPlacesList = this.renderPlacesList.bind(this);
    this.renderMap = this.renderMap.bind(this);
    this.renderMapMarkers = this.renderMapMarkers.bind(this);
    this.renderActionButtons = this.renderActionButtons.bind(this);
  }

  componentDidMount() {
    this.setCurrentLocation();
  }

  setCurrentLocation() {
    this.setState({ currentPositionStatus: this.CURRENT_POSITION_STATUS.IN_PROGRESS });

    return GeoLocationService.promptLocationAccess().then(() => {
      return GeoLocationService.getCurrentLocation();
    }).then((position) => {
      this.setState({
        currentPosition: position,
        currentPositionStatus: this.CURRENT_POSITION_STATUS.SUCCESS,
      });
      return GoogleMapsService.getNearby(
        position.latitude, position.longitude, this.PLACES_SEARCH_RADIUS
      );
    }).then((places) => {
      this.setState({ places });
    }, (error) => {
      this.setState({
        currentPositionStatus: this.CURRENT_POSITION_STATUS.ERROR,
      });
      console.warn(error);
    });
  }

  shouldShowSpinner() {
    return _.includes([
      this.CURRENT_POSITION_STATUS.IN_PROGRESS,
      this.CURRENT_POSITION_STATUS.PENDING,
    ], this.state.currentPositionStatus);
  }

  renderPlacesRow(place) {
    return (
      <Row styleName="small" style={styles.placesListRow}>
        <View styleName="vertical">
          <Subtitle styleName="bold">{place.name}</Subtitle>
          <Caption numberOfLines={1}>{place.address}</Caption>
        </View>
        <UIIcon styleName="disclosure" name="right-arrow"/>
      </Row>
    );
  }

  renderMapMarkers() {
    return _.map(this.state.places, (place, index) => {
      return (
        <MapView.Marker
          title={place.name}
          description={place.address}
          pinColor="blue"
          coordinate={{ latitude: place.latitude, longitude: place.longitude }}
          key={index}
        />
      );
    });
  }

  renderMap() {
    const { latitude, longitude, latitudeDelta, longitudeDelta } = this.state.currentPosition;
    return (
      <MapView
        style={styles.map}
        initialRegion={{ latitude, longitude, latitudeDelta, longitudeDelta }}
      >
        {this.renderMapMarkers()}
        <MapView.Marker coordinate={{ latitude, longitude }} />
      </MapView>
    );
  }

  renderPlacesList() {
    return (
      <View style={styles.placesContainer}>
        {
          (() => {
            if (this.state.places === null) {
              return <Spinner />;
            }
            if (this.state.places.length === 0) {
              return <Text>{`No places within ${this.PLACES_SEARCH_RADIUS} metres nearby...`}</Text>;
            }
            return <ListView data={this.state.places} renderRow={this.renderPlacesRow} />;
          })()
        }
      </View>
    );
  }

  renderActionButtons() {
    return (
      <View styleName="horizontal" style={styles.actionButtonsContainer}>
        <Button
          styleName="confirmation border"
          onPress={() => { this.props.navigation.goBack(); }}
        >
          <Text>CANCEL</Text>
        </Button>
        <Button styleName="confirmation border secondary">
          <Text>CONFIRM</Text>
        </Button>
      </View>
    );
  }

  render() {
    if (this.shouldShowSpinner()) {
      return (
        <View styleName="fill-parent vertical v-center">
          <Spinner />
        </View>
      );
    }
    if (this.state.currentPositionStatus === this.CURRENT_POSITION_STATUS.ERROR) {
      return (
        <View styleName="fill-parent vertical v-center">
          <Text>Allow location services to enable check-in feature.</Text>
        </View>
      );
    }
    return (
      <RNView style={styles.container}>
        <StatusBar hidden />
        {this.renderMap()}
        {this.renderPlacesList()}
        {this.renderActionButtons()}
      </RNView>
    );
  }
}

/**
 * TODO
 *
 * 1. Create components/Maps component to store map and markers
 * 2. Add PropTypes to all components in this screen
 * 3. Create components/ActionButtons to store lower 2 buttons
 * 4. Update Redux store to keep track of the currentSelectedLocation
 * 5. Make sure Redux currentSelectedLocation is cleared on checkin
 * 6. Pull in places and currentSelectedLocation into this Screen
 * 7. Remove all calls to Maps API services
 * 8. Tapping on a marker or item in the list will set the "new" currentLocation
 * 9. Pressing confirm will update the Redux store to set the new selectedLocation
 * 10. Use information from Google Maps to show more info when tapping on cursor (price, rating)
 * 11. Possibly also show the distance between current location and newly selected location
 *
 * Future:
 *
 * 1. Query previous checkins and merge two sets together.
 */

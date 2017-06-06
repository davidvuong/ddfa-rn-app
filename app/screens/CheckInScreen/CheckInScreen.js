import React, { Component } from 'react';
import _ from 'lodash';

import Icon from 'react-native-vector-icons/Ionicons';

import {
  View,
  ListView,
  Spinner,
  Row
} from '@shoutem/ui';
import {
  Title,
  Text,
  Subtitle,
  Caption
} from '@shoutem/ui';
import { Icon as UIIcon } from '@shoutem/ui';

import { View as RNView } from 'react-native';

import MapView from 'react-native-maps';
import GeoLocationService from '../../services/GeoLocationService';

const CURRENT_POSITION_STATUS = {
  PENDING: 'PENDING',
  IN_PROGRESS: 'IN_PROGRESS',
  ERROR: 'ERROR',
  SUCCESS: 'SUCCESS'
};

export default class CheckInScreen extends Component {
  static navigationOptions = {
    header: null,
    tabBarLabel: () => {
      return <Caption styleName="h-center">Check-in</Caption>;
    },
    tabBarIcon: () => (
      <Icon name="ios-pin" size={24} />
    )
  };

  constructor(props) {
    super(props);

    this.state = {
      currentPosition: null,
      currentPositionStatus: CURRENT_POSITION_STATUS.PENDING,
      places: [ // Hard coding these here just to build the UI.
        {
          "name": "Gaspar Brasserie",
          "address": "185 Sutter St, San Francisco, CA 94109",
        },
        {
          "name": "Chalk Point Kitchen",
          "address": "527 Broome St, New York, NY 10013",
        },
        {
          "name": "My boy's place",
          "address": "71 Pilgrim Avenue Chevy Chase, MD 20815",
        },
        {
          "name": "Chin Chin",
          "address": "44 Shirley Ave. West Chicago, IL 60185",
        },
      ],
    };

    this.shouldShowSpinner = this.shouldShowSpinner.bind(this);
    this.getCurrentLocation = this.getCurrentLocation.bind(this);
    this.renderPlacesRow = this.renderPlacesRow.bind(this);
  }

  componentDidMount() {
    this.getCurrentLocation();
  }

  getCurrentLocation() {
    this.setState({ currentPositionStatus: CURRENT_POSITION_STATUS.IN_PROGRESS });

    GeoLocationService.promptLocationAccess().then(() => {
      return GeoLocationService.getCurrentLocation();
    }).then((position) => {
      this.setState({
        currentPosition: position,
        currentPositionStatus: CURRENT_POSITION_STATUS.SUCCESS,
      });
    }, () => {
      this.setState({
        currentPositionStatus: CURRENT_POSITION_STATUS.ERROR,
      });
    });
  }

  shouldShowSpinner() {
    return _.includes([
      CURRENT_POSITION_STATUS.IN_PROGRESS,
      CURRENT_POSITION_STATUS.PENDING
    ], this.state.currentPositionStatus);
  }

  renderPlacesRow(place) {
    return (
      <Row styleName="small" style={{ height: 60 }}>
        <UIIcon name="pin" />
        <View styleName="vertical">
          <Subtitle styleName="bold">{place.name}</Subtitle>
          <Caption numberOfLines={1}>{place.address}</Caption>
        </View>
        <UIIcon styleName="disclosure" name="right-arrow"/>
      </Row>
    );
  }

  render() {
    if (this.shouldShowSpinner()) {
      return (
        <View styleName="fill-parent vertical v-center">
          <Spinner style={styles.spinner} />
        </View>
      );
    }
    if (this.state.currentPositionStatus === CURRENT_POSITION_STATUS.ERROR) {
      return (
        <View styleName="fill-parent vertical v-center">
          <Text>Allow location services to enable check-in feature.</Text>
        </View>
      );
    }

    const { currentPosition } = this.state;
    const { latitude, longitude, latitudeDelta, longitudeDelta } = currentPosition;
    return (
      <RNView style={styles.container}>
        <MapView
          style={styles.map}
          initialRegion={{ latitude, longitude, latitudeDelta, longitudeDelta }}
        />
        <View style={styles.placesContainer}>
          <ListView
            data={this.state.places}
            renderRow={this.renderPlacesRow}
          />
        </View>
      </RNView>
    );
  }
}

const styles = {
  container: {
    flex: 1,
    flexDirection: 'column',
  },
  map: {
    flex: 0.6,
  },
  placesContainer: {
    flex: 0.4,
  },
  spinner: {
    size: 'large',
  },
};

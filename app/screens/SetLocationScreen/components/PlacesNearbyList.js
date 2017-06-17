import React, { Component } from 'react';
import PropTypes from 'prop-types';

import {
  View,
  ListView,
  Row,
  Icon,
} from '@shoutem/ui';
import {
  Text,
  Subtitle,
  Caption,
} from '@shoutem/ui';

import styles from '../Styles';

const propTypes = {
  places: PropTypes.array.isRequired,

  selectedLocationTmp: PropTypes.object,
  setSelectedLocationTmp: PropTypes.func.isRequired,
};

export default class PlacesNearbyList extends Component {
  constructor(props) {
    super(props);

    this.renderPlacesRow = this.renderPlacesRow.bind(this);
  }

  renderPlacesRow(place) {
    return (
      <Row styleName="small" style={styles.placesListRow}>
        <View styleName="vertical">
          <Subtitle styleName="bold">{place.name}</Subtitle>
          <Caption numberOfLines={1}>{place.address}</Caption>
        </View>
        <Icon styleName="disclosure" name="right-arrow" />
      </Row>
    );
  }

  render() {
    return (
      <View style={styles.placesContainer}>
        {this.props.places.length === 0 ?
          <Text>No places nearby...</Text>
          :
          <ListView data={this.props.places} renderRow={this.renderPlacesRow} />
        }
      </View>
    );
  }
}

PlacesNearbyList.propTypes = propTypes;

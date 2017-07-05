import sample from 'lodash/sample';
import isNull from 'lodash/isNull';

import React, { Component } from 'react';
import {
  StatusBar,
} from 'react-native';
import PropTypes from 'prop-types';
import {
  Title,
  Subtitle,
  Divider,
  Image,
  ListView,
  Tile,
  View,
  Spinner,
} from '@shoutem/ui';

import images from '../../../Images';

const propTypes = {
  checkIns: PropTypes.array.isRequired,
  loadMore: PropTypes.func.isRequired,
  isLoading: PropTypes.bool,
};

export default class InfiniteScrollFeed extends Component {
  constructor(props) {
    super(props);

    this.SAMPLE_IMAGES = [
      images.restaurantImage1,
      images.restaurantImage2,
      images.restaurantImage3,
      images.restaurantImage4,
      images.restaurantImage5,
    ];
    this.PAGINATION_SIZE = 10;

    /* Render */
    this.renderRow = this.renderRow.bind(this);
  }

  componentDidMount() {
    // Initial load to fetch a couple of check-ins (only if nothing exists).
    if (!this.props.checkIns.length) {
      this.props.loadMore((new Date()).toISOString(), this.PAGINATION_SIZE);
    }
  }

  renderRow(checkIn) {
    return (
      <View>
        <Image styleName="large-banner" source={sample(this.SAMPLE_IMAGES)}>
          <Tile>
            <Title styleName="md-gutter-bottom">{checkIn.name}</Title>
            <Subtitle styleName="sm-gutter-horizontal">{checkIn.address}</Subtitle>
          </Tile>
        </Image>
        <Divider styleName="line" />
      </View>
    );
  }

  render() {
    if (this.props.isLoading || isNull(this.props.isLoading)) {
      return (
        <View styleName="fill-parent horizontal h-center vertical v-center">
          <StatusBar barStyle="dark-content" />
          <Spinner />
        </View>
      );
    }

    return (
      <ListView data={this.props.checkIns} renderRow={this.renderRow} />
    );
  }
}

InfiniteScrollFeed.propTypes = propTypes;

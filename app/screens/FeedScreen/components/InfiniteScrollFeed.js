import shuffle from 'lodash/shuffle';
import isNull from 'lodash/isNull';
import cloneDeep from 'lodash/cloneDeep';
import last from 'lodash/last';

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Title,
  Subtitle,
  Text,
  Divider,
  Image,
  ListView,
  Tile,
  View,
  Spinner,
} from '@shoutem/ui';

import styles from '../Styles';
import images from '../../../Images';

const propTypes = {
  checkIns: PropTypes.array.isRequired,
  loadMore: PropTypes.func.isRequired,
  resetCheckIns: PropTypes.func.isRequired,
  isLoading: PropTypes.bool,
};

export default class InfiniteScrollFeed extends Component {
  constructor(props) {
    super(props);

    this.PAGINATION_SIZE = 10;
    this.SAMPLE_IMAGES = [
      images.foodImage1,
      images.foodImage2,
      images.foodImage3,
      images.foodImage4,
      images.foodImage5,
      images.foodImage6,
      images.foodImage7,
      images.foodImage8,
      images.foodImage9,
    ];
    this.sampleImagePool = [];
    this.backgroundImageCache = {};

    /* Helpers */
    this.getBackgroundImage = this.getBackgroundImage.bind(this);
    this.performInitialLoad = this.performInitialLoad.bind(this);

    /* Render */
    this.renderRow = this.renderRow.bind(this);
    this.onLoadMore = this.onLoadMore.bind(this);
    this.onRefresh = this.onRefresh.bind(this);
  }

  componentDidMount() {
    // Initial load to fetch a couple of check-ins (only if nothing exists).
    if (!this.props.checkIns.length) {
      this.performInitialLoad();
    }
  }

  performInitialLoad() {
    this.props.loadMore((new Date()).toISOString(), this.PAGINATION_SIZE);
  }

  /* Memorization and tries to reduce duplicated image series. */
  getBackgroundImage(checkInId) {
    const cachedBackgroundImage = this.backgroundImageCache[checkInId];
    if (cachedBackgroundImage) {
      return cachedBackgroundImage;
    }
    if (!this.sampleImagePool.length) {
      this.sampleImagePool = shuffle(cloneDeep(this.SAMPLE_IMAGES));
    }
    const backgroundImage = this.sampleImagePool.shift();
    this.backgroundImageCache[checkInId] = backgroundImage;
    return backgroundImage;
  }

  onLoadMore() {
    const checkIn = last(this.props.checkIns);
    if (!checkIn) { return null; }
    return this.props.loadMore(checkIn.createdAt, this.PAGINATION_SIZE);
  }

  onRefresh() {
    this.props.resetCheckIns();
    this.performInitialLoad();
  }

  renderRow(checkIn, _, counter) {
    return (
      <View>
        <Image
          styleName="large-banner"
          source={this.getBackgroundImage(checkIn.id)}
          style={styles.checkInRowItem}
        >
          <Tile>
            <Title styleName="md-gutter-bottom" numberOfLines={2}>{checkIn.name}</Title>
            <Subtitle styleName="sm-gutter-horizontal" numberOfLines={4}>{checkIn.address}</Subtitle>
          </Tile>
          <Text style={styles.checkInTimeAgo}>{checkIn.createdAt}</Text>
          <Text style={styles.checkInCounter}>{parseInt(counter, 10) + 1}</Text>
        </Image>
        <Divider styleName="line" />
      </View>
    );
  }

  render() {
    const { isLoading, checkIns } = this.props;
    if (isNull(isLoading)) {
      return (
        <View styleName="fill-parent horizontal h-center vertical v-center">
          <Spinner />
        </View>
      );
    }

    return (
      <ListView
        data={checkIns}
        loading={isLoading}
        renderRow={this.renderRow}
        onLoadMore={this.onLoadMore}
        onRefresh={this.onRefresh}
      />
    );
  }
}

InfiniteScrollFeed.propTypes = propTypes;

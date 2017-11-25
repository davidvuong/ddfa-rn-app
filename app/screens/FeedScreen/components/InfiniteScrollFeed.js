import shuffle from 'lodash/shuffle';
import cloneDeep from 'lodash/cloneDeep';
import last from 'lodash/last';
import isNull from 'lodash/isNull';

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Image,
  View,
  ListView,
  Text,
} from 'react-native';

import ActionButton from 'react-native-action-button';
import Icon from 'react-native-vector-icons/Ionicons';

import styles from '../Styles';
import images from '../../../Images';

const propTypes = {
  checkIns: PropTypes.array.isRequired,
  loadMore: PropTypes.func.isRequired,
  resetCheckIns: PropTypes.func.isRequired,
  isLoading: PropTypes.bool,
  loadMoreError: PropTypes.object,
};

export default class InfiniteScrollFeed extends Component {
  constructor(props) {
    super(props);

    this.PAGINATION_SIZE = 20;
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

    this.state = {
      isLoadingInitial: null,
      isLoadingMore: null,
    };

    /* Helpers */
    this.getBackgroundImage = this.getBackgroundImage.bind(this);
    this.performInitialLoad = this.performInitialLoad.bind(this);

    /* Render */
    this.renderRow = this.renderRow.bind(this);
    this.onLoadMore = this.onLoadMore.bind(this);
    this.onRefresh = this.onRefresh.bind(this);
    this.onScrollToTop = this.onScrollToTop.bind(this);
    this.onScrollToBottom = this.onScrollToBottom.bind(this);
  }

  componentDidMount() {
    console.log(this.props);
    // Initial load to fetch a couple of check-ins (only if nothing exists).
    if (!this.props.checkIns.length) {
      this.performInitialLoad();
    }
  }

  performInitialLoad() {
    this.setState({ isLoadingInitial: true });
    this.props.loadMore((new Date()).toISOString(), this.PAGINATION_SIZE).finally(() => {
      this.setState({ isLoadingInitial: false });
    });
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

    this.setState({ isLoadingMore: true });
    this.props.loadMore(checkIn.createdAt, this.PAGINATION_SIZE).finally(() => {
      this.setState({ isLoadingMore: false });
    });
  }

  onRefresh() {
    this.props.resetCheckIns();
    this.performInitialLoad();
  }

  onScrollToTop() {
    const scrollTo = { x: 0, y: 0, animated: true };

    // `InfiniteScrollFeed` is a ref in our custom wrapper.
    // `wrapperInstance` is something exposed by shoutem.ui to access the underlying
    // `ReactNative.ListView`. From there we simply call RN's `scrollTo` function.
    const wrapper = this.refs.InfiniteScrollFeed.wrappedInstance;

    // Make sure this doesn't blow up, causing our app to potentially crash.
    if (!wrapper) {
      console.error('wrappedInstance in InfiniteScrollFeed (ListView) does not exist');
      return null;
    }
    wrapper.listView.scrollTo(scrollTo);
  }

  onScrollToBottom() {
    this.refs.InfiniteScrollFeed.wrappedInstance.listView.scrollToEnd();
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
            <Subtitle styleName="sm-gutter-horizontal" numberOfLines={3}>{checkIn.address}</Subtitle>
          </Tile>
          <Text style={styles.checkInTimeAgo}>{checkIn.createdAt}</Text>
          <Text style={styles.checkInCounter}>{parseInt(counter, 10) + 1}</Text>
        </Image>
        <Divider styleName="line" />
      </View>
    );
  }

  render() {
    if (isNull(this.state.isLoadingInitial) || this.state.isLoadingInitial) {
      return (
        <View styleName="fill-parent horizontal h-center vertical v-center">
          <Text>Loading</Text>
        </View>
      );
    }

    return (
      <View styleName="fill-parent">
        <ListView
          dataSource={this.props.checkIns}
          loading={this.state.isLoadingMore}
          renderRow={this.renderRow}
          onLoadMore={this.onLoadMore}
          onRefresh={this.onRefresh}
          ref="InfiniteScrollFeed"
        />
        <ActionButton
          position="left"
          offsetX={8}
          offsetY={44}
          icon={<Icon name="ios-arrow-up-outline" size={18} />}
          size={28}
          buttonColor={'rgba(255, 255, 255, 0.9)'}
          hideShadow
          onPress={this.onScrollToTop}
        />
        <ActionButton
          position="left"
          offsetX={8}
          offsetY={8}
          icon={<Icon name="ios-arrow-down-outline" size={18} />}
          size={28}
          hideShadow
          buttonColor={'rgba(255, 255, 255, 0.9)'}
          onPress={this.onScrollToBottom}
        />
      </View>
    );
  }
}

InfiniteScrollFeed.propTypes = propTypes;

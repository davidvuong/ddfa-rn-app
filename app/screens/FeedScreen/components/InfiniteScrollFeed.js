import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Title,
  Subtitle,
  Divider,
  Image,
  ListView,
  Tile,
  View,
} from '@shoutem/ui';

const propTypes = {
  places: PropTypes.array.isRequired,
};

export default class InfiniteScrollFeed extends Component {
  constructor(props) {
    super(props);

    /* Render */
    this.renderRow = this.renderRow.bind(this);
  }

  renderRow(place) {
    return (
      <View>
        <Image
          styleName="large-banner"
          source={{ uri: place.image.url }}
        >
          <Tile>
            <Title styleName="md-gutter-bottom">{place.name}</Title>
            <Subtitle styleName="sm-gutter-horizontal">{place.address}</Subtitle>
          </Tile>
        </Image>
        <Divider styleName="line" />
      </View>
    );
  }

  render() {
    return (
      <ListView
        data={this.props.places}
        renderRow={this.renderRow}
      />
    );
  }
}

InfiniteScrollFeed.propTypes = propTypes;

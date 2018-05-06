import * as React from 'react';
import {
  Image,
  Dimensions,
} from 'react-native';
import {
  View,
} from 'native-base';
import Carousel, { Pagination } from 'react-native-snap-carousel';

import Styles from './Styles';

export default class ImageCarousel extends React.Component {
  state = {
    activeSlide: 0,
    carouselWidth: Dimensions.get('window').width - 20,
  };

  onRenderItem = ({ item }) => {
    const style = { height: Styles.carouselHeight, width: this.state.carouselWidth };
    return <Image style={style} source={item} />;
  }

  render() {
    const carouselHeight = Styles.carouselHeight; // eslint-disable-line prefer-destructuring
    const carouselWidth = this.state.carouselWidth; // eslint-disable-line prefer-destructuring
    return (
      <View style={Styles.container}>
        <Carousel
          data={this.props.images}
          renderItem={this.onRenderItem}
          sliderWidth={carouselWidth}
          itemWidth={carouselWidth}
          sliderHeight={carouselHeight}
          itemHeight={carouselHeight}
          onSnapToItem={(index) => { this.setState({ activeSlide: index }); }}
        />
        <Pagination
          dotsLength={this.props.images.length}
          activeDotIndex={this.state.activeSlide}
          inactiveDotOpacity={0.4}
          inactiveDotScale={0.6}
        />
      </View>
    );
  }
}

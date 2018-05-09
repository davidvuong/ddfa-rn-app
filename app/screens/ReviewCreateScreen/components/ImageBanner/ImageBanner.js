import * as React from 'react';
import _ from 'lodash';

import {
  View,
  Image,
} from 'react-native';

import { initFoodImageGenerator } from '../../../../Images';
import Styles from './Styles';

const ImageBanner = () => {
  const generator = initFoodImageGenerator();
  const maxImages = _.range(5);
  const images = _.map(maxImages, (i) => {
    return <Image source={generator.get(i)} key={i} style={Styles.image} />;
  });
  return <View style={Styles.container}>{images}</View>;
};

export default ImageBanner;

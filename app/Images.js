// @flow
import _ from 'lodash';

/* eslint-disable global-require */
export const Images = {
  foodImage1: require('./images/food_1.jpg'),
  foodImage2: require('./images/food_2.jpg'),
  foodImage3: require('./images/food_3.jpg'),
  foodImage4: require('./images/food_4.jpg'),
  foodImage5: require('./images/food_5.jpg'),
  foodImage6: require('./images/food_6.jpg'),
  foodImage7: require('./images/food_7.jpg'),
  foodImage8: require('./images/food_8.jpg'),
  foodImage9: require('./images/food_9.jpg'),
  backgroundImage1: require('./images/background_image_1.jpg'),
};
/* eslint-enable */

class ImageGenerator {
  sampleImages: Array<string>;
  imagePool: Array<string>;
  imageCache: Object;

  constructor(sampleImages: Array<string>) {
    this.sampleImages = sampleImages;
    this.imagePool = [];
    this.imageCache = {};

    (this: any).get = this.get.bind(this);
  }

  get(key: string): string {
    const cachedImage: ?string = this.imageCache[key];
    if (cachedImage) {
      return cachedImage;
    }
    if (!this.imagePool.length) {
      this.imagePool = _.shuffle(_.cloneDeep(this.sampleImages));
    }
    const newImage: string = this.imagePool.shift();
    this.imageCache[key] = newImage;
    return newImage;
  }
}

export function initImageGenerator(): ImageGenerator {
  return new ImageGenerator([
    Images.foodImage1,
    Images.foodImage2,
    Images.foodImage3,
    Images.foodImage4,
    Images.foodImage5,
    Images.foodImage6,
    Images.foodImage7,
    Images.foodImage8,
    Images.foodImage9,
  ]);
}

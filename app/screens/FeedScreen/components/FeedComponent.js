// @flow
import _ from 'lodash';
import * as React from 'react';
import {
  Container,
  Header,
  Body,
  Content,
  Text,
  Card,
  CardItem,
  Right,
} from 'native-base';
import {
  Image,
} from 'react-native';

import navigationOptions from '../NavigationOptions';
import Styles from '../Styles';
import Images from '../../../Images';

type Props = {
  checkIns: Array<*>,
  isListingCheckIns: ?boolean,
  checkInListErrorStatus: ?Error,
  listCheckIns: (string, number) => *,
};

type State = {
  isInitialLoad: boolean,
  paginationSize: number,
};

export default class FeedScreen extends React.Component<Props, State> {
  static navigationOptions = navigationOptions;

  sampleImages: Array<Buffer>;
  sampleImagePool: Array<Buffer>;
  backgroundImageCache: Object;

  constructor(props: Props) {
    super(props);

    this.state = {
      isInitialLoad: false,
      paginationSize: 20,
    };

    this.sampleImages = [
      Images.foodImage1,
      Images.foodImage2,
      Images.foodImage3,
      Images.foodImage4,
      Images.foodImage5,
      Images.foodImage6,
      Images.foodImage7,
      Images.foodImage8,
      Images.foodImage9,
    ];
    this.sampleImagePool = [];
    this.backgroundImageCache = {};

    (this: any).performInitialLoad = this.performInitialLoad.bind(this);
    (this: any).getBackgroundImage = this.getBackgroundImage.bind(this);
  }

  componentDidMount() {
    // Initial load to fetch a couple of check-ins (only if nothing exists).
    if (!this.props.checkIns.length) {
      this.performInitialLoad();
    }
  }

  /* Memorization and tries to reduce duplicated image series. */
  getBackgroundImage(checkInId: string) {
    const cachedBackgroundImage = this.backgroundImageCache[checkInId];
    if (cachedBackgroundImage) {
      return cachedBackgroundImage;
    }
    if (!this.sampleImagePool.length) {
      this.sampleImagePool = _.shuffle(_.cloneDeep(this.sampleImages));
    }
    const backgroundImage = this.sampleImagePool.shift();
    this.backgroundImageCache[checkInId] = backgroundImage;
    return backgroundImage;
  }

  performInitialLoad() {
    this.setState({ isInitialLoad: true });
    this.props.listCheckIns((new Date()).toISOString(), this.state.paginationSize)
      .finally(() => {
        this.setState({ isInitialLoad: false });
      });
  }

  render() {
    return (
      <Container>
        <Header>
          <Body>
            <Text>DDFA Feed</Text>
          </Body>
        </Header>
          <Content padder removeClippedSubviews={true}>
            {
              _.map(this.props.checkIns, (checkIn: *) => {
                return (
                  <Card key={checkIn.id}>
                    <CardItem>
                      <Body>
                        <Text numberOfLines={1}>{checkIn.name}</Text>
                        <Text note numberOfLines={1}>{checkIn.address}</Text>
                      </Body>
                    </CardItem>
                    <CardItem cardBody>
                      <Image source={this.getBackgroundImage(checkIn.id)} style={{ height: 180, width: null, flex: 1 }} />
                      <Text note numberOfLines={1} style={{
                        position: 'absolute',
                        bottom: 3,
                        right: 3,
                        backgroundColor: 'rgba(0, 0, 0, 0)',
                        color: 'white',
                        fontWeight: '500',
                        fontStyle: 'italic',
                        fontSize: 10,
                      }}>{checkIn.createdAt}</Text>
                    </CardItem>
                  </Card>
                );
              })
            }
          </Content>
      </Container>
    );
  }
}

// @flow
import _ from 'lodash';
import * as React from 'react';
import {
  Container,
  Header,
  Left,
  Right,
  Body,
  Content,
  Text,
  Icon,
  Card,
  CardItem,
  Footer,
  FooterTab,
  Button,
  Input,
} from 'native-base';
import {
  Alert,
  Keyboard,
} from 'react-native';
import MapView from 'react-native-maps';

import GeoLocationService from '../../../services/GeoLocationService';
import navigationOptions from '../NavigationOptions';
import Styles from '../Styles';

type Props = {
  selectedLocation: *,
  navigation: *,
  resetSelectedLocation: () => *,
};

type State = {
  isWritingComment: boolean,
  comment: ?string,
};

export default class CheckInDetailComponent extends React.Component<Props, State> {
  static navigationOptions = navigationOptions;

  constructor(props: Props) {
    super(props);

    this.state = {
      isWritingComment: false,
      comment: null,
    };

    (this: any).onPressCancel = this.onPressCancel.bind(this);
    (this: any).onPressDone = this.onPressDone.bind(this);
    (this: any).onFocusComment = this.onFocusComment.bind(this);
    (this: any).onChangeTextComment = this.onChangeTextComment.bind(this);
  }

  componentWillUnmount() {
    this.props.resetSelectedLocation();
  }

  onPressCancel() {
    const buttons = [
      { text: 'Yes', onPress: this.props.navigation.goBack },
      { text: 'No', style: 'cancel' },
    ];
    Alert.alert('Cancel Check-in', 'Are you sure you want to cancel?', buttons);
  }

  onPressDone() {
    this.setState({ isWritingComment: false });
    Keyboard.dismiss();
  }

  onFocusComment() {
    this.setState({ isWritingComment: true });
  }

  onChangeTextComment(comment: string) {
    this.setState({ comment });
  }

  render() {
    const { latitude, longitude, place } = this.props.selectedLocation;
    const delta = GeoLocationService.calculateRegionDelta(latitude, longitude);
    return (
      <Container>
        <Header>
          <Left />
          <Body>
            <Text style={Styles.headerTitle}>DDFA CheckIn</Text>
          </Body>
          <Right>
            {
              this.state.isWritingComment ? (
                <Button transparent onPress={this.onPressDone}>
                  <Text>Done</Text>
                </Button>
              ) : null
            }
          </Right>
        </Header>
        <Content>
          <MapView
            zoomEnabled={false}
            rotateEnabled={false}
            scrollEnabled={false}
            pitchEnabled={false}
            toolbarEnabled={false}
            moveOnMarkerPress={false}
            initialRegion={{
              latitude,
              longitude,
              latitudeDelta: delta.latitudeDelta,
              longitudeDelta: delta.longitudeDelta,
            }}
            style={Styles.mapView}
          >
            <MapView.Marker coordinate={{ latitude, longitude }} />
          </MapView>
          <Content padder>
            <Card>
              <CardItem header style={{
                borderBottomColor: 'rgba(0, 0, 0, .05)',
                borderBottomWidth: 1,
                paddingBottom: 5,
              }}>
                <Body>
                  <Text>{place.name}</Text>
                  <Text style={{
                    fontSize: 12,
                    marginTop: 3,
                    marginBottom: 3,
                    fontWeight: '500',
                    color: 'orange',
                  }}>
                    4.1 stars{' '}
                    <Icon name="md-star" style={{ fontSize: 12, color: 'orange' }}/>
                    <Icon name="md-star" style={{ fontSize: 12, color: 'orange' }}/>
                    <Icon name="md-star" style={{ fontSize: 12, color: 'orange' }}/>
                    <Icon name="md-star" style={{ fontSize: 12, color: 'orange' }}/>
                    {' '}($$$)
                  </Text>
                  <Text note>{place.address}</Text>
                </Body>
              </CardItem>
              <CardItem style={{
                paddingTop: 5,
                paddingLeft: 10,
                paddingRight: 10,
              }}>
                <Input
                  placeholder="Add any additional comments and/or share your experience at this restaurant..."
                  onFocus={this.onFocusComment}
                  multiline={true}
                  style={{ fontSize: 14, minHeight: 180 }}
                  onChangeText={this.onChangeTextComment}
                  maxLength={2048}
                  autoGrow={true}
                  onBlur={() => { this.setState({ isWritingComment: false }); }}
                />
              </CardItem>
            </Card>
          </Content>
        </Content>
        <Footer>
          <FooterTab>
            <Button onPress={() => { this.onPressCancel(); }}>
              <Text>Cancel</Text>
            </Button>
          </FooterTab>
          <FooterTab>
            <Button>
              <Text>Check In</Text>
            </Button>
          </FooterTab>
        </Footer>
      </Container>
    );
  }
}

import { connect } from 'react-redux';
import FeedComponent from './components/FeedComponent';

import {
  setSelectedLocation,
} from '../../actions/CheckInActions';

const mapStateToProps = () => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {
    setSelectedLocation: (location) => {
      return dispatch(setSelectedLocation(location));
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FeedComponent);

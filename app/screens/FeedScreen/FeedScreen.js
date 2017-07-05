import { connect } from 'react-redux';
import FeedComponent from './components/FeedComponent';

import {
  setSelectedLocation,
  listCheckIns,
  resetCheckIns,
} from '../../actions/CheckInActions';

const mapStateToProps = (state) => {
  const { checkIn } = state;
  return {
    checkIns: checkIn.checkIns,
    isListingCheckIns: checkIn.isListingCheckIns,
    checkInListErrorStatus: checkIn.checkInListErrorStatus,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setSelectedLocation: (location) => {
      return dispatch(setSelectedLocation(location));
    },
    listCheckIns: (startTime, limit) => {
      return dispatch(listCheckIns(startTime, limit));
    },
    resetCheckIns: () => {
      return dispatch(resetCheckIns());
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FeedComponent);

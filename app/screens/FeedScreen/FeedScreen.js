// @flow
import { connect } from 'react-redux';
import FeedComponent from './components/FeedComponent';

import {
  listCheckIns,
} from '../../actions/CheckInActions';

const mapStateToProps = (state: *) => {
  const { checkIn } = state;
  return {
    checkIns: checkIn.checkIns,
    isListingCheckIns: checkIn.isListingCheckIns,
    checkInListErrorStatus: checkIn.checkInListErrorStatus,
  };
};

const mapDispatchToProps = (dispatch: *) => {
  return {
    listCheckIns: (startTime: string, limit: number) => {
      return dispatch(listCheckIns(startTime, limit));
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(FeedComponent);

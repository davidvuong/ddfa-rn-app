// @flow
import { connect } from 'react-redux';
import CheckInListComponent from './components/CheckInListComponent';

import {
  listCheckIns,
  setSelectedLocation,
  setSelectedCheckIn,
  resetCheckIns,
} from '../../actions/CheckInActions';
import {
  logoutUser,
} from '../../actions/AuthenticationActions';

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
    listCheckIns: (startTime: string) => {
      return dispatch(listCheckIns(startTime));
    },
    setSelectedCheckIn: (selectedCheckIn: *) => {
      return dispatch(setSelectedCheckIn(selectedCheckIn));
    },
    logoutUser: () => {
      return dispatch(logoutUser());
    },
    setSelectedLocation: (selectedLocation: Object) => {
      return dispatch(setSelectedLocation(selectedLocation));
    },
    resetCheckIns: () => {
      return dispatch(resetCheckIns());
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(CheckInListComponent);

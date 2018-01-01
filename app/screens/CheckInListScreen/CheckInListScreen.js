// @flow
import { connect } from 'react-redux';
import CheckInListComponent from './components/CheckInListComponent';

import {
  createCheckIn,
  listCheckIns,
  setSelectedCheckIn,
  resetCheckIns,
} from '../../actions/CheckInActions';

const mapStateToProps = (state: *) => {
  const { checkIn } = state;
  return {
    isCheckingIn: checkIn.isCheckingIn,
    checkIns: checkIn.checkIns,
    isListingCheckIns: checkIn.isListingCheckIns,
    checkInListErrorStatus: checkIn.checkInListErrorStatus,
  };
};

const mapDispatchToProps = (dispatch: *) => {
  return {
    createCheckIn: (latitude: number, longitude: number, address: string, name: string) => {
      return dispatch(createCheckIn(latitude, longitude, address, name));
    },
    listCheckIns: (startTime: string) => {
      return dispatch(listCheckIns(startTime));
    },
    setSelectedCheckIn: (selectedCheckIn: *) => {
      return dispatch(setSelectedCheckIn(selectedCheckIn));
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

// @flow
import { connect } from 'react-redux';
import CheckInCreateComponent from './components/CheckInCreateComponent';

import {
  createCheckIn,
  listCheckIns,
  resetSelectedLocation,
  resetCheckIns,
} from '../../actions/CheckInActions';

const mapStateToProps = (state: *) => {
  const { checkIn } = state;
  return {
    isCheckingIn: checkIn.isCheckingIn,
    selectedLocation: checkIn.selectedLocation,
  };
};

const mapDispatchToProps = (dispatch: *) => {
  return {
    createCheckIn: (
      latitude: number,
      longitude: number,
      address: string,
      name: string,
      comment: ?string,
      rating: ?number,
      isPaying: boolean,
      amountPaid: ?number,
    ) => {
      return dispatch(createCheckIn(
        latitude,
        longitude,
        address,
        name,
        comment,
        rating,
        isPaying,
        amountPaid,
      ));
    },
    resetSelectedLocation: () => {
      return dispatch(resetSelectedLocation());
    },
    resetCheckIns: () => {
      return dispatch(resetCheckIns());
    },
    listCheckIns: (startTime: string, limit: number) => {
      return dispatch(listCheckIns(startTime, limit));
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(CheckInCreateComponent);

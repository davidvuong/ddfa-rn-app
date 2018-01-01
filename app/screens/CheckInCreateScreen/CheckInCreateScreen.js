// @flow
import { connect } from 'react-redux';
import CheckInCreateComponent from './components/CheckInCreateComponent';

import {
  listCheckIns,
  resetSelectedLocation,
  resetCheckIns,
} from '../../actions/CheckInActions';

const mapStateToProps = (state: *) => {
  const { checkIn } = state;
  return {
    selectedLocation: checkIn.selectedLocation,
  };
};

const mapDispatchToProps = (dispatch: *) => {
  return {
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

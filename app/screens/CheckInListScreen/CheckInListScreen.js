import { connect } from 'react-redux';
import CheckInListComponent from './components/CheckInListComponent';

import {
  listCheckIns,
  setSelectedCheckIn,
  resetCheckIns,
} from '../../actions/CheckInActions';

const mapStateToProps = (state) => {
  const { checkIn } = state;
  return {
    checkIns: checkIn.checkIns,
    totalCheckIns: checkIn.totalCheckIns,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    listCheckIns: (startTime) => {
      return dispatch(listCheckIns(startTime));
    },
    setSelectedCheckIn: (selectedCheckIn) => {
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

import * as actions from '../ActionTypes';
import CheckInsService from '../services/CheckInsService';

/* Internal */

function checkInRequest() {
  return { type: actions.CHECK_IN_REQUEST };
}

function checkInSuccess() {
  return { type: actions.CHECK_IN_SUCCESS };
}

function checkInError(error) {
  return { type: actions.CHECK_IN_ERROR, error };
}

/* External */

export function checkIn(latitude, longitude, address, name, comment, rating, isPaying, amountPaid) {
  return (dispatch) => {
    dispatch(checkInRequest());
    return CheckInsService.checkIn(
      latitude,
      longitude,
      address,
      name,
      comment,
      rating,
      isPaying,
      amountPaid
    ).then(() => {
      dispatch(checkInSuccess());
    }, (error) => {
      dispatch(checkInError(error));
      throw error;
    });
  };
}

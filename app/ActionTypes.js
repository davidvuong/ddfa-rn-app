// @flow

// TODO: All X_Y_ERROR should not actually store the error.
//
// Let the component that deals with the error figure out what to do.
export const LOGIN_USER_REQUEST = 'authentication/LOGIN_USER_REQUEST';
export const LOGIN_USER_SUCCESS = 'authentication/LOGIN_USER_SUCCESS';
export const LOGIN_USER_ERROR = 'authentication/LOGIN_USER_ERROR';

export const LOGOUT_USER_REQUEST = 'authentication/LOGOUT_USER_REQUEST';
export const LOGOUT_USER_SUCCESS = 'authentication/LOGOUT_USER_SUCCESS';
export const LOGOUT_USER_ERROR = 'authentication/LOGOUT_USER_ERROR';

export const CREATE_CHECK_IN_REQUEST = 'checkIn/CREATE_CHECK_IN_REQUEST';
export const CREATE_CHECK_IN_SUCCESS = 'checkIn/CREATE_CHECK_IN_SUCCESS';
export const CREATE_CHECK_IN_ERROR = 'checkIn/CREATE_CHECK_IN_ERROR';

export const RESET_CHECK_IN_LIST = 'checkIn/RESET_CHECK_IN_LIST';
export const SET_SELECTED_CHECK_IN = 'checkIn/SET_SELECTED_CHECK_IN';
export const RESET_SELECTED_CHECK_IN = 'checkIn/RESET_SELECTED_CHECK_IN';

export const SET_SELECTED_LOCATION = 'checkIn/SET_SELECTED_LOCATION';
export const RESET_SELECTED_LOCATION = 'checkIn/RESET_SELECTED_LOCATION';

export const LIST_CHECK_IN_REQUEST = 'checkIn/LIST_CHECK_IN_REQUEST';
export const LIST_CHECK_IN_SUCCESS = 'checkIn/LIST_CHECK_IN_SUCCESS';
export const LIST_CHECK_IN_ERROR = 'checkIn/LIST_CHECK_IN_ERROR';

export const GET_CHECK_IN_REQUEST = 'checkIn/GET_CHECK_IN_REQUEST';
export const GET_CHECK_IN_SUCCESS = 'checkIn/GET_CHECK_IN_SUCCESS';
export const GET_CHECK_IN_ERROR = 'checkIn/GET_CHECK_IN_ERROR';

export const CREATE_REVIEW_REQUEST = 'review/CREATE_REVIEW_REQUEST';
export const CREATE_REVIEW_SUCCESS = 'review/CREATE_REVIEW_SUCCESS';
export const CREATE_REVIEW_ERROR = 'review/CREATE_REVIEW_ERROR';

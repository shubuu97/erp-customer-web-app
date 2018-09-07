import * as FORGOT_CONSTANTS from '../constants/forgotPassword';

export const   forgotPasswordData = (state = {
  type: '',
  error: '',
  isFetching: false,
  didInvalidate: false,
  lookUpData: {}
}, action) => {
  switch (action.type) {

      case FORGOT_CONSTANTS.REQUEST_FORGOT_PASSWORD:
          return Object.assign({}, state, {
              isFetching: true,
              type: action.type,
              lastUpdated: action.receivedAt
          });
      case FORGOT_CONSTANTS.RECEIVED_FORGOT_PASSWORD:
          return Object.assign({}, state, {
              isFetching: false,
              type: action.type,
              didInvalidate: false,
              lookUpData: action.data,
              lastUpdated: action.receivedAt
          });
      case FORGOT_CONSTANTS.RECEIVED_FORGOT_PASSWORD_ERROR:
          return Object.assign({}, state, {
              isFetching: false,
              type: action.type,
              lookUpData:{},
              error: action.error
          })

      default:
          return state
  }
}
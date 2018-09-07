import * as RESET_CONSTANTS from '../constants/resetPassword';
export const   resetPasswordData = (state = {
  type: '',
  error: '',
  isFetching: false,
  didInvalidate: false,
  lookUpData: {}
}, action) => {
  switch (action.type) {

      case RESET_CONSTANTS.REQUEST_RESET_PASSWORD:
          return Object.assign({}, state, {
              isFetching: true,
              type: action.type,
              lastUpdated: action.receivedAt
          });
      case RESET_CONSTANTS.RECEIVED_RESET_PASSWORD:
          return Object.assign({}, state, {
              isFetching: false,
              type: action.type,
              didInvalidate: false,
              lookUpData: action.data,
              lastUpdated: action.receivedAt
          });
      case RESET_CONSTANTS.RECEIVED_RESET_PASSWORD_ERROR:
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
import * as SET_CONSTANTS from '../constants/resetPassword';
export const   setPasswordData = (state = {
  type: '',
  error: '',
  isFetching: false,
  didInvalidate: false,
  lookUpData: {}
}, action) => {
  switch (action.type) {

      case SET_CONSTANTS.REQUEST_SET_PASSWORD:
          return Object.assign({}, state, {
              isFetching: true,
              type: action.type,
              lastUpdated: action.receivedAt
          });
      case SET_CONSTANTS.RECEIVED_SET_PASSWORD:
          return Object.assign({}, state, {
              isFetching: false,
              type: action.type,
              didInvalidate: false,
              lookUpData: action.data,
              lastUpdated: action.receivedAt
          });
      case SET_CONSTANTS.RECEIVED_SET_PASSWORD_ERROR:
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
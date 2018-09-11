import * as ZIPCODE_CONSTANTS from '../../src/constants/zipCode';
import _get from 'lodash/get'

const zipCodeInfo = (state = {
    type: '',
    error: '',
    isFetching: false,
    //didInvalidate: false,
    lookUpData: {},
    meta:{}
  }, action) => {
    switch (action.type) {
      case ZIPCODE_CONSTANTS.REQUEST_ZIP:
        return Object.assign({}, state, {
          isFetching: true,
          type: action.type,
          lastUpdated: action.receivedAt,
        });
      case ZIPCODE_CONSTANTS.RECEIVED_ZIP:
        return Object.assign({}, state, {
          error:'',
          isFetching: false,
          type: action.type,
          //didInvalidate: false,
          lookUpData: _get(action,'data.data',{}),
          meta:action.subreddit,
          lastUpdated: action.receivedAt,
        });
      case ZIPCODE_CONSTANTS.RECEIVED_ZIP_ERROR:
        return Object.assign({}, state, {
          isFetching: false,
          type: action.type,
          error: action.error,
          lookUpData:{},
          lastUpdated:action.receivedAt
        });
    }
    return state;
  }

export default zipCodeInfo;
import * as LICENSE_CONSTANTS from '../../src/constants/licenseInfo'

const licenseData = (state = {
    type: '',
    error: '',
    isFetching: false,
    //didInvalidate: false,
    lookUpData: {data:{},message:null}
  }, action) => {
    switch (action.type) {
      case LICENSE_CONSTANTS.REQUEST_LICENSE_INFO:
        return Object.assign({}, state, {
          isFetching: true,
          type: action.type,
          lastUpdated: action.receivedAt,
        });
      case LICENSE_CONSTANTS.RECEIVED_LICENSE_INFO:
        return Object.assign({}, state, {
          error:'',
          isFetching: false,
          type: action.type,
          //didInvalidate: false,
          lookUpData: action.data,
          lastUpdated: action.receivedAt,
        });
      case LICENSE_CONSTANTS.RECEIVED_LICENSE_INFO_ERROR:
        return Object.assign({}, state, {
          isFetching: false,
          type: action.type,
          error: action.error,
          lookUpData:[],
          lastUpdated:action.receivedAt
        });
    }
    return state;
  }

export default licenseData;
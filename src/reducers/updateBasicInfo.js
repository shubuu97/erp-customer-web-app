import * as UPDATEBASICINFO_CONSTANTS from '../../src/constants/updateBasicInfo'

const updateBasicInfo = (state = {
    type: '',
    error: '',
    isFetching: false,
    //didInvalidate: false,
    lookUpData: []
  }, action) => {
    switch (action.type) {
      case UPDATEBASICINFO_CONSTANTS.REQUEST_UPDATE_BASICINFO:
        return Object.assign({}, state, {
          isFetching: true,
          type: action.type,
          lastUpdated: action.receivedAt,
        });
      case UPDATEBASICINFO_CONSTANTS.RECEIVED_UPDATE_BASICINFO:
        return Object.assign({}, state, {
          error:'',
          isFetching: false,
          type: action.type,
          //didInvalidate: false,
          lookUpData: action.data,
          lastUpdated: action.receivedAt,
        });
      case UPDATEBASICINFO_CONSTANTS.RECEIVED_UPDATE_BASICINFO_ERROR:
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

export default updateBasicInfo;
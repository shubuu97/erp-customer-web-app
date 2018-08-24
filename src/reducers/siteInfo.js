import * as SITE_CONSTANTS from '../../src/constants/siteInfo'

const siteData = (state = {
    type: '',
    error: '',
    isFetching: false,
    //didInvalidate: false,
    lookUpData: {data:{},message:null}
  }, action) => {
    switch (action.type) {
      case SITE_CONSTANTS.REQUEST_SITE_INFO:
        return Object.assign({}, state, {
          isFetching: true,
          type: action.type,
          lastUpdated: action.receivedAt,
        });
      case SITE_CONSTANTS.RECEIVED_SITE_INFO:
        return Object.assign({}, state, {
          error:'',
          isFetching: false,
          type: action.type,
          //didInvalidate: false,
          lookUpData: action.data,
          lastUpdated: action.receivedAt,
        });
      case SITE_CONSTANTS.RECEIVED_SITE_INFO_ERROR:
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

export default siteData;
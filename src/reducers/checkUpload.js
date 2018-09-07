import * as UPLOADVOIDCHECK_CONSTANTS from '../../src/constants/uploadVoidCheck'
const bankingData = (state = {
    type: '',
    error: '',
    isFetching: false,
    //didInvalidate: false,
    lookUpData: {data:{},message:null}
  }, action) => {
    switch (action.type) {
      case UPLOADVOIDCHECK_CONSTANTS.REQUEST_UPLOADVOIDCHECK:
        return Object.assign({}, state, {
          isFetching: true,
          type: action.type,
          lastUpdated: action.receivedAt,
        });
      case UPLOADVOIDCHECK_CONSTANTS.RECEIVED_UPLOADVOIDCHECK:
        return Object.assign({}, state, {
          error:'',
          isFetching: false,
          type: action.type,
          //didInvalidate: false,
          lookUpData: action.data,
          lastUpdated: action.receivedAt,
        });
      case UPLOADVOIDCHECK_CONSTANTS.RECEIVED_UPLOADVOIDCHECK_ERROR:
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

export default bankingData;
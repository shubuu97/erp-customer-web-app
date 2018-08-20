import * as BANKING_CONSTANTS from '../../src/constants/banking'
const bankingData = (state = {
    type: '',
    error: '',
    isFetching: false,
    //didInvalidate: false,
    lookUpData: {data:{},message:null}
  }, action) => {
    switch (action.type) {
      case BANKING_CONSTANTS.REQUEST_BANKING_DATA:
        return Object.assign({}, state, {
          isFetching: true,
          type: action.type,
          lastUpdated: action.receivedAt,
        });
      case BANKING_CONSTANTS.RECEIVED_BANKING_DATA:
        return Object.assign({}, state, {
          error:'',
          isFetching: false,
          type: action.type,
          //didInvalidate: false,
          lookUpData: action.data,
          lastUpdated: action.receivedAt,
        });
      case BANKING_CONSTANTS.RECEIVED_BANKING_DATA_ERROR:
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
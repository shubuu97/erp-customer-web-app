import * as APPROVAL_CONSTANTS from '../../src/constants/approval'
const bankingData = (state = {
    type: '',
    error: '',
    isFetching: false,
    //didInvalidate: false,
    lookUpData: {data:{},message:null}
  }, action) => {
    switch (action.type) {
      case APPROVAL_CONSTANTS.REQUEST_APPROVAL_DATA:
        return Object.assign({}, state, {
          isFetching: true,
          type: action.type,
          lastUpdated: action.receivedAt,
        });
      case APPROVAL_CONSTANTS.RECEIVED_APPROVAL_DATA:
        return Object.assign({}, state, {
          error:'',
          isFetching: false,
          type: action.type,
          //didInvalidate: false,
          lookUpData: action.data,
          lastUpdated: action.receivedAt,
        });
      case APPROVAL_CONSTANTS.RECEIVED_APPROVAL_DATA_ERROR:
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
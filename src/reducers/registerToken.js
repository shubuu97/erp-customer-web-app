import * as REGISTER_TOKEN_CONSTANTS from '../../src/constants/registerToken';

const registerData = (state = {
    type: '',
    error: '',
    isFetching: false,
    //didInvalidate: false,
    lookUpData: {data:{},message:null}
  }, action) => {
    switch (action.type) {
      case REGISTER_TOKEN_CONSTANTS.REQUEST_CUSTOMER_REGISTER_TOKEN:
        return Object.assign({}, state, {
          isFetching: true,
          type: action.type,
          lastUpdated: action.receivedAt,
        });
      case REGISTER_TOKEN_CONSTANTS.RECEIVED_CUSTOMER_REGISTER_TOKEN:
        return Object.assign({}, state, {
          error:'',
          isFetching: false,
          type: action.type,
          //didInvalidate: false,
          lookUpData: action.data,
          lastUpdated: action.receivedAt,
        });
      case REGISTER_TOKEN_CONSTANTS.RECEIVED_CUSTOMER_REGISTER_ERROR_TOKEN:
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

export default registerData;
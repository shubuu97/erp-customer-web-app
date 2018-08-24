import * as REGISTER_CONSTANTS from '../../src/constants/register'

const registerData = (state = {
    type: '',
    error: '',
    isFetching: false,
    //didInvalidate: false,
    lookUpData: {data:{},message:null}
  }, action) => {
    switch (action.type) {
      case REGISTER_CONSTANTS.REQUEST_CUSTOMER_REGISTER:
        return Object.assign({}, state, {
          isFetching: true,
          type: action.type,
          lastUpdated: action.receivedAt,
        });
      case REGISTER_CONSTANTS.RECEIVED_CUSTOMER_REGISTER:
        return Object.assign({}, state, {
          error:'',
          isFetching: false,
          type: action.type,
          //didInvalidate: false,
          lookUpData: action.data,
          lastUpdated: action.receivedAt,
        });
      case REGISTER_CONSTANTS.RECEIVED_CUSTOMER_REGISTER_ERROR:
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
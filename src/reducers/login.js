import * as LOGIN_CONSTANTS from '../../src/constants/login'

const loginReducer = (state = {
    type: '',
    error: '',
    isFetching: false,
    //didInvalidate: false,
    lookUpData: []
  }, action) => {
    switch (action.type) {
      case LOGIN_CONSTANTS.REQUEST_LOGIN:
        return Object.assign({}, state, {
          isFetching: true,
          type: action.type,
          lastUpdated: action.receivedAt,
        });
      case LOGIN_CONSTANTS.RECEIVED_LOGIN:
        return Object.assign({}, state, {
          error:'',
          isFetching: false,
          type: action.type,
          //didInvalidate: false,
          lookUpData: action.data,
          lastUpdated: action.receivedAt,
        });
      case LOGIN_CONSTANTS.RECEIVED_LOGIN_ERROR:
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

export default loginReducer;
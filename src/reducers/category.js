import * as CATEGORY_CONSTANTS from '../../src/constants/category'

const categoryData = (state = {
    type: '',
    error: '',
    isFetching: false,
    categories: {},
    meta:{}
  }, action) => {
    switch (action.type) {
      case CATEGORY_CONSTANTS.REQUEST_CATEGORY:
        return Object.assign({}, state, {
          isFetching: true,
          type: action.type,
          lastUpdated: action.receivedAt,
        });
      case CATEGORY_CONSTANTS.RECEIVED_CATEGORY:
        return Object.assign({}, state, {
          error:'',
          isFetching: false,
          type: action.type,
          categories: action.data.data,
          meta:action.subreddit,
          lastUpdated: action.receivedAt,
        });
      case CATEGORY_CONSTANTS.RECEIVED_CATEGORY_ERROR:
        return Object.assign({}, state, {
          isFetching: false,
          type: action.type,
          error: action.error,
          categories:{},
          lastUpdated:action.receivedAt
        });
    }
    return state;
  }

export default categoryData;
import * as CHECKOUT_CONSTANTS from '../constants/checkout';

const inventoryItemData = (state = {
  type: '',
  error: '',
  isFetching: false,
  didInvalidate: false,
}, action) => {
  switch (action.type) {

    case CHECKOUT_CONSTANTS.REQUEST_CHECKOUT_ITEM:
      return Object.assign({}, state, {
        isFetching: true,
        type: action.type,
        lastUpdated: action.receivedAt
      });
    case CHECKOUT_CONSTANTS.RECEIVED_CHECKOUT_ITEM:
      return Object.assign({}, state, {
        isFetching: false,
        type: action.type,
        didInvalidate: false,
        lastUpdated: action.receivedAt
      });
    case CHECKOUT_CONSTANTS.RECEIVED_CHECKOUT_ITEM_ERROR:
      return Object.assign({}, state, {
        isFetching: false,
        type: action.type,
        error: action.error
      })
    default:
      return state
  }
}
export default inventoryItemData;

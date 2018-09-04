import * as ORDER_CONSTANTS from '../constants/OrderList';

const OrderListData = (state = {
  type: '',
  error: '',
  isFetching: false,
  didInvalidate: false,
  orderListData: {}
}, action) => {
  switch (action.type) {

    case ORDER_CONSTANTS.REQUEST_ORDER_LIST:
      return Object.assign({}, state, {
        isFetching: true,
        type: action.type,
        lastUpdated: action.receivedAt
      });
    case ORDER_CONSTANTS.RECEIVED_ORDER_LIST:
      return Object.assign({}, state, {
        isFetching: false,
        type: action.type,
        didInvalidate: false,
        orderListData: action.data,
        lastUpdated: action.receivedAt
      });
    case ORDER_CONSTANTS.RECEIVED_ORDER_LIST_ERROR:
      return Object.assign({}, state, {
        isFetching: false,
        type: action.type,
        error: action.error
      })
    default:
      return state
  }
}
export default OrderListData;

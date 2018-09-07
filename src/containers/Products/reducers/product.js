import * as INVENTORY_CONSTANTS from '../constants/product';

const inventoryItemData = (state = {
  type: '',
  error: '',
  isFetching: false,
  didInvalidate: false,
  inventoryItemList: [],
  selectedProduct: {},
  selectedCategoryType: {},
  cartProductList: [],
  filteredDataSet: {}
}, action) => {
  switch (action.type) {

    case INVENTORY_CONSTANTS.REQUEST_INVENTORY_ITEM:
      return Object.assign({}, state, {
        isFetching: true,
        type: action.type,
        lastUpdated: action.receivedAt
      });
    case INVENTORY_CONSTANTS.RECEIVED_INVENTORY_ITEM:
      return Object.assign({}, state, {
        isFetching: false,
        type: action.type,
        didInvalidate: false,
        inventoryItemList: action.data,
        lastUpdated: action.receivedAt
      });
    case INVENTORY_CONSTANTS.RECEIVED_INVENTORY_ITEM_ERROR:
      return Object.assign({}, state, {
        isFetching: false,
        type: action.type,
        inventoryItemList: [],
        error: action.error
      })
    case INVENTORY_CONSTANTS.SET_SELECTED_PRODUCT:
      return Object.assign({}, state, {
        type: action.type,
        selectedProduct: action.data
      })
    case INVENTORY_CONSTANTS.ADD_TO_CART:
      return Object.assign({}, state, {
        type: action.type,
        cartProductList: action.data
      })
    case INVENTORY_CONSTANTS.SET_SELECTED_CATEGORY_TYPE:
      return Object.assign({}, state, {
        type: action.type,
        selectedCategoryType: action.data
      })
    case INVENTORY_CONSTANTS.APPLY_FILTER:
      return Object.assign({}, state, {
        type: action.type,
        filteredDataSet: action.data
      })
    default:
      return state
  }
}
export default inventoryItemData;

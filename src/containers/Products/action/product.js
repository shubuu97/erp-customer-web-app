import * as INVENTORY_CONSTANTS from '../constants/product';
import dynamicActionWrapper from '../../../utills/actionHelpers'

export const requestInventoryData = subreddit => ({
  type: INVENTORY_CONSTANTS.REQUEST_INVENTORY_ITEM,
  subreddit,
});

export const receiveInventoryData = (subreddit, json) => ({
  type: INVENTORY_CONSTANTS.RECEIVED_INVENTORY_ITEM,
  subreddit,
  data: json,
  receivedAt: Date.now(),
});

export const receiveInventoryDataError = (subreddit, err, errCode) => ({
  type: INVENTORY_CONSTANTS.RECEIVED_INVENTORY_ITEM_ERROR,
  subreddit,
  error: err,
  errorCode: errCode,
});

export const fetchInventoryItemData = (url, subreddit) => dispatch =>
  dispatch(dynamicActionWrapper({
    path: url,
    method: 'get',
    initCb: requestInventoryData,
    successCb: receiveInventoryData,
    failureCb: receiveInventoryDataError,
    subreddit,
    wrapperActionType: 'FETCH_INVENTORY_ITEM_WRAPPER',
    redirect: 'follow'
  }));

export const setSelectedProduct = (data) => ({
    type: INVENTORY_CONSTANTS.SET_SELECTED_PRODUCT,
    data: data,
});

export const setSelectedCategoryType = (data) => ({
  type: INVENTORY_CONSTANTS.SET_SELECTED_CATEGORY_TYPE,
  data: data,
});

export const addToCart = (data) => ({
  type: INVENTORY_CONSTANTS.ADD_TO_CART,
  data: data,
});


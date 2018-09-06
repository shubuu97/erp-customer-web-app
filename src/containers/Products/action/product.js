import * as INVENTORY_CONSTANTS from '../constants/product';
import dynamicActionWrapper from '../../../utills/actionHelpers'
import {filter} from 'lodash';

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

export const applyFilter = (list, filterObj) => {
  let dataObj = {
    filteredData : [],
    filterObj: filterObj
  }
  if (filterObj.lessThan50) {
    filter(list, (item) => item.price < 50).map((product) => {
      dataObj.filteredData.push(product);
    });
  }
  if (filterObj.from50To100) {
    filter(list, (item) => (item.price > 50 && item.price < 100)).map((product) => {
      dataObj.filteredData.push(product);
    });
  }
  if (filterObj.from100To200) {
    filter(list, (item) => (item.price > 100 && item.price < 200)).map((product) => {
      dataObj.filteredData.push(product);
    });
  }
  if (filterObj.above200) {
    filter(list, (item) => (item.price > 200)).map((product) => {
      dataObj.filteredData.push(product);
    });
  }
  if (!filterObj.lessThan50 && !filterObj.from50To100 && !filterObj.from100To200 && !filterObj.above200) {
    dataObj.filteredData = list;
  }
  return {
    type: INVENTORY_CONSTANTS.APPLY_FILTER,
    data: dataObj,
  }
};


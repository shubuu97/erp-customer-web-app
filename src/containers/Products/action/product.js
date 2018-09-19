import * as INVENTORY_CONSTANTS from '../constants/product';
import dynamicActionWrapper from '../../../utills/actionHelpers'
import {filter,orderBy} from 'lodash';

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

export const applyFilter = (list, filterObj,orderKey) => {
  let dataObj = {
    filteredData : [],
    filterObj: filterObj
  }
  
  let allFalse = true;

Object.keys(filterObj).map((filterRange)=>
{
  if (filterObj[filterRange]) {
    allFalse = false;
   let range =  filterRange.split('-');
   let min = range[0];
   let max = range[1];
    filter(list, (item) => (item.price >=min && item.price <=max )).map((product) => {

      dataObj.filteredData.push(product);
    });
  }
  
})

if(Object.keys(filterObj).length==0||allFalse)
{
  dataObj.filteredData = list;
}
debugger;
if(orderKey=='a-z')
{
  console.log(dataObj.filteredData,"ff");
  dataObj.filteredData = orderBy(dataObj.filteredData, [data => data.aliasName.toLowerCase()], ['asc']);
}
if(orderKey=='z-a')
{
  console.log(dataObj.filteredData,"ff");
  dataObj.filteredData = orderBy(dataObj.filteredData, [data => data.aliasName.toLowerCase()], ['desc']);
}
if(orderKey=="numerical")
{
  dataObj.filteredData = orderBy(dataObj.filteredData, [data => data.price], ['asc']);
}

  return {
    type: INVENTORY_CONSTANTS.APPLY_FILTER,
    data: dataObj,
  }
};


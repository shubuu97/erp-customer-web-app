import * as CATEGORY_TYPE_ITEMS_CONSTANTS from '../constants/categoryTypeAndItems';
import dynamicActionWrapper from '../utills/actionHelpers';


export const requestCategoryTypeAndItems = subreddit => ({
    type: CATEGORY_TYPE_ITEMS_CONSTANTS.REQUEST_CATEGORY_TYPE_AND_ITEMS,
    subreddit
})
export const receiveCategoryTypeAndItems = (subreddit, json, id, resolve) => {
    resolve(json);
    return({
        type: CATEGORY_TYPE_ITEMS_CONSTANTS.RECEIVED_CATEGORY_TYPE_AND_ITEMS,
        subreddit,
        data: json,
        receivedAt: Date.now()
    });
};

export  const receiveCategoryTypeAndItemsError = (subreddit, err, errCode, reject) => {
    reject(err);
    return({
        type:CATEGORY_TYPE_ITEMS_CONSTANTS.RECEIVED_CATEGORY_TYPE_AND_ITEMS_ERROR,
        subreddit,
        error: err,
        errorCode: errCode
    })
  };

export const fetchCategoryTypeAndItems = (url, data, subreddit) => dispatch => {
    return new Promise((resolve, reject) => {
    dispatch(dynamicActionWrapper({
        path: url,
        method: 'POST',
        body: data,
        initCb: requestCategoryTypeAndItems,
        successCb: receiveCategoryTypeAndItems,
        failureCb: receiveCategoryTypeAndItemsError,
        resolve: resolve,
        reject: reject,
        subreddit,
        wrapperActionType: 'FETCH_CATEGORY',
        redirect: 'follow'
    }));
    })
}

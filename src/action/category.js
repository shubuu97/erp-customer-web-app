import * as CATEGORY_CONSTANTS from '../constants/category';
import dynamicActionWrapper from '../utills/actionHelpers';



export const requestCategory = subreddit => ({
    type: CATEGORY_CONSTANTS.REQUEST_CATEGORY,
    subreddit
})
export const receiveCategory = (subreddit, json, id, resolve) => {
    resolve(json);
    return({
        type: CATEGORY_CONSTANTS.RECEIVED_CATEGORY,
        subreddit,
        data: json,
        receivedAt: Date.now()
    });
};

export  const receiveCategoryError = (subreddit, err, errCode, reject) => {
    reject(err);
    return({
        type:CATEGORY_CONSTANTS.RECEIVED_CATEGORY_ERROR,
        subreddit,
        error: err,
        errorCode: errCode
    })
  };

export const fetchCategory = (url,data, subreddit) => dispatch => {
    return new Promise((resolve, reject) => {
    dispatch(dynamicActionWrapper({
        path: url,
        method: 'POST',
        body: data,
        initCb: requestCategory,
        successCb: receiveCategory,
        failureCb: receiveCategoryError,
        resolve: resolve,
        reject: reject,
        subreddit,
        wrapperActionType: 'FETCH_CATEGORY',
        redirect: 'follow'
    }));
    })
}

export const selectedCategory = (category) => dispatch => {
    dispatch({
        type: CATEGORY_CONSTANTS.SELECTED_CATEGORY,
        data: category
    })
}

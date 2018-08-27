import * as BASICINFO_CONSTANTS from '../constants/basicInfo';
import dynamicActionWrapper from '../utills/actionHelpers';



export const requestBasicInfoData = subreddit => ({
    type: BASICINFO_CONSTANTS.REQUEST_BASICINFO_DATA,
    subreddit
})

export const receiveBasicInfoData = (subreddit, json, id, resolve) => {
    resolve(json);
  return({
    type: BASICINFO_CONSTANTS.RECEIVED_BASICINFO_DATA,
    subreddit,
    data: json,
    receivedAt: Date.now()
  });
};

export  const receiveBasicInfoDataError = (subreddit, err, errCode, reject) => {
    reject(err);
     return({
        type:BASICINFO_CONSTANTS.RECEIVED_BASICINFO_DATA_ERROR,
        subreddit,
        error: err,
        errorCode: errCode
    })
  };


export const postBasicInfoData = (data,subreddit,url) => dispatch => {
    return new Promise((resolve, reject) => {
    dispatch(dynamicActionWrapper({
        path: url,
        method: 'post',
        body:data,
        initCb: requestBasicInfoData,
        successCb: receiveBasicInfoData,
        failureCb: receiveBasicInfoDataError,
        resolve: resolve,
        reject: reject,
        subreddit,
        wrapperActionType: 'FETCH_CUSTOMER_SEARCH_RESULT_WRAPPER',
        redirect: 'follow'
    }));
    })
}

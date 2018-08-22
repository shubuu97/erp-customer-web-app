import * as BASICINFO_CONSTANTS from '../constants/basicInfo';
import dynamicActionWrapper from '../utills/actionHelpers';



export const requestBasicInfoData = subreddit => ({
    type: BASICINFO_CONSTANTS.REQUEST_BASICINFO_DATA,
    subreddit
})

export const receiveBasicInfoData = (subreddit, json) => ({
    type: BASICINFO_CONSTANTS.RECEIVED_BASICINFO_DATA,
    subreddit,
    data: json,
    receivedAt: Date.now()
});

const receiveBasicInfoDataError = (subreddit,err,errCode) => ({
    type:BASICINFO_CONSTANTS.RECEIVED_BASICINFO_DATA_ERROR,
    subreddit,
    error: err,
    errorCode: errCode
})

export const postBasicInfoData = (data,subreddit,url) => dispatch => 
dispatch(dynamicActionWrapper({
    path: url,
    method: 'post',
    body:data,
    initCb: requestBasicInfoData,
    successCb: receiveBasicInfoData,
    failureCb: receiveBasicInfoDataError,
    subreddit,
    wrapperActionType: 'FETCH_CUSTOMER_SEARCH_RESULT_WRAPPER',
    redirect: 'follow'
}));

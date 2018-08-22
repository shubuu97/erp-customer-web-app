import * as ZIP_CONSTANTS from '../constants/zipCode';
import dynamicActionWrapper from '../utills/actionHelpers';



export const requestZip = subreddit => ({
    type: ZIP_CONSTANTS.REQUEST_ZIP,
    subreddit
})

export const receiveZip = (subreddit, json) => ({
    type: ZIP_CONSTANTS.RECEIVED_ZIP,
    subreddit,
    data: json,
    receivedAt: Date.now()
});

const receiveZipError = (subreddit,err,errCode) => ({
    type:ZIP_CONSTANTS.RECEIVED_ZIP_ERROR,
    subreddit,
    error: err,
    errorCode: errCode
})

export const fetchZip = (url,subreddit) => dispatch => 
dispatch(dynamicActionWrapper({
    path: url,
    method: 'GET',
    initCb: requestZip,
    successCb: receiveZip,
    failureCb: receiveZipError,
    subreddit,
    wrapperActionType: 'FETCH_ZIP',
    redirect: 'follow'
}));

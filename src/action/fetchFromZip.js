import * as ZIP_CONSTANTS from '../constants/zipCode';
import dynamicActionWrapper from '../utills/actionHelpers';



export const requestZip = subreddit => ({
    type: ZIP_CONSTANTS.REQUEST_ZIP,
    subreddit
})
export const receiveZip = (subreddit, json, id, resolve) => {
   json?resolve(json):null;
    return({
        type: ZIP_CONSTANTS.RECEIVED_ZIP,
        subreddit,
        data: json,
        
        receivedAt: Date.now()
    });
};

export  const receiveZipError = (subreddit, err, errCode, reject) => {
    reject(err);
    return({
        type:ZIP_CONSTANTS.RECEIVED_ZIP_ERROR,
        subreddit,
        error: err,
        errorCode: errCode
    })
  };

export const fetchZip = (url,subreddit) => dispatch => {
    return new Promise((resolve, reject) => {
    dispatch(dynamicActionWrapper({
        path: url,
        method: 'GET',
        initCb: requestZip,
        successCb: receiveZip,
        failureCb: receiveZipError,
        resolve: resolve,
        reject: reject,
        subreddit,
        wrapperActionType: 'FETCH_ZIP',
        redirect: 'follow'
    }));
    })
}

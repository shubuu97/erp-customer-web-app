import * as FORMDATA_CONSTANTS from '../constants/formData';
import dynamicActionWrapper from '../utills/actionHelpers';




export const requestFormData = subreddit => ({
    type: FORMDATA_CONSTANTS.REQUEST_FORM_DATA,
    subreddit
})

export const receiveFormData = (subreddit, json,id,resolve) => {
    resolve(json);
  return({
    type: FORMDATA_CONSTANTS.RECEIVED_FORM_DATA,
    subreddit,
    data: json,
    receivedAt: Date.now()
});
};

export const receiveFormDataError = (subreddit, err, errCode,reject) => {
    reject(err);
     return({
    type: FORMDATA_CONSTANTS.RECEIVED_FORM_DATA_ERROR,
    subreddit,
    error: err,
    errorCode: errCode
})
};

export const fetchProfileFormData = (url, subreddit) => dispatch =>{
    return new Promise((resolve, reject) => {
    dispatch(dynamicActionWrapper({
        path: url,
        method: 'get',
        initCb: requestFormData,
        successCb: receiveFormData,
        failureCb: receiveFormDataError,
        resolve: resolve,
        reject: reject,
        subreddit,
        wrapperActionType: 'FETCH_CUSTOMER_SEARCH_RESULT_WRAPPER',
        redirect: 'follow'
    }));
})
}

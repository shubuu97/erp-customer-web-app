import * as LICENSE_DETAILS_CONSTANTS from '../constants/licenseDetails';
import dynamicActionWrapper from '../utills/actionHelpers';




export const requestLicenseDetailsData = subreddit => ({
    type: LICENSE_DETAILS_CONSTANTS.REQUEST_LICENSE_DETAILS_DATA,
    subreddit
})

export const receiveLicenseDetailsData = (subreddit, json, id, resolve) => {
    resolve(json);
  return({
    type: LICENSE_DETAILS_CONSTANTS.RECEIVED_LICENSE_DETAILS_DATA,
    subreddit,
    data: json,
    receivedAt: Date.now()
  });
};

export  const receiveLicenseDetailsDataError = (subreddit, err, errCode, reject) => {
    reject(err);
     return({
        type: LICENSE_DETAILS_CONSTANTS.RECEIVED_LICENSE_DETAILS_DATA_ERROR,
        subreddit,
        error: err,
        errorCode: errCode
    })
  };


export const fetchLicenseDetailsData = (url, subreddit) => dispatch => {
    return new Promise((resolve, reject) => {
    dispatch(dynamicActionWrapper({
        path: url,
        method: 'get',
        initCb: requestLicenseDetailsData,
        successCb: receiveLicenseDetailsData,
        failureCb: receiveLicenseDetailsDataError,
        resolve: resolve,
        reject: reject,
        subreddit,
        wrapperActionType: 'FETCH_LICENSE_DETAILS_DATA_WRAPPER',
        redirect: 'follow'
    }));
    })
}
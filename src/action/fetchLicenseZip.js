import * as ZIP_CONSTANTS from '../constants/licenseZipCode';
import dynamicActionWrapper from '../utills/actionHelpers';



export const requestLicenseZip = subreddit => ({
    type: ZIP_CONSTANTS.REQUEST_LICENSE_ZIP,
    subreddit
})
export const receiveLicenseZip = (subreddit, json, id, resolve) => {
   json?resolve(json):null;
    return({
        type: ZIP_CONSTANTS.RECEIVED_LICENSE_ZIP,
        subreddit,
        data: json,
        receivedAt: Date.now()
    });
};

export  const receiveLicenseZipError = (subreddit, err, errCode, reject) => {
    reject(err);
    return({
        type:ZIP_CONSTANTS.RECEIVED_LICENSE_ZIP_ERROR,
        subreddit,
        error: err,
        errorCode: errCode
    })
  };

export const fetchLicenseZip = (url,subreddit) => dispatch => {
    return new Promise((resolve, reject) => {
    dispatch(dynamicActionWrapper({
        path: url,
        method: 'GET',
        initCb: requestLicenseZip,
        successCb: receiveLicenseZip,
        failureCb: receiveLicenseZipError,
        resolve: resolve,
        reject: reject,
        subreddit,
        wrapperActionType: 'FETCH_ZIP',
        redirect: 'follow'
    }));
    })
}

export const resetZipToInitial = () => dispatch => {
    dispatch({
        type: ZIP_CONSTANTS.RECEIVED_LICENSE_ZIP,
        subreddit:'',
        data: {},
        receivedAt: Date.now()
    })
}
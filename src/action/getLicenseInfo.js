import * as LICENSE_DETAILS_CONSTANTS from '../constants/licenseDetails';
import dynamicActionWrapper from '../utills/actionHelpers';




export const requestLicenseDetailsData = subreddit => ({
    type: LICENSE_DETAILS_CONSTANTS.REQUEST_LICENSE_DETAILS_DATA,
    subreddit
})

export const receiveLicenseDetailsData = (subreddit, json) => ({
    type: LICENSE_DETAILS_CONSTANTS.RECEIVED_LICENSE_DETAILS_DATA,
    subreddit,
    data: json,
    receivedAt: Date.now()
});

export const receiveLicenseDetailsDataError = (subreddit, err, errCode) => ({
    type: LICENSE_DETAILS_CONSTANTS.RECEIVED_LICENSE_DETAILS_DATA_ERROR,
    subreddit,
    error: err,
    errorCode: errCode
})

export const fetchLicenseDetailsData = (url, subreddit) => dispatch =>
    dispatch(dynamicActionWrapper({
        path: url,
        method: 'get',
        initCb: requestLicenseDetailsData,
        successCb: receiveLicenseDetailsData,
        failureCb: receiveLicenseDetailsDataError,
        subreddit,
        wrapperActionType: 'FETCH_LICENSE_DETAILS_DATA_WRAPPER',
        redirect: 'follow'
    }));
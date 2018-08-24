import * as SITE_DETAILS_CONSTANTS from '../constants/siteDetails';
import dynamicActionWrapper from '../utills/actionHelpers';




export const requestSiteDetailsData = subreddit => ({
    type: SITE_DETAILS_CONSTANTS.REQUEST_SITE_DETAILS_DATA,
    subreddit
})

export const receiveSiteDetailsData = (subreddit, json) => ({
    type: SITE_DETAILS_CONSTANTS.RECEIVED_SITE_DETAILS_DATA,
    subreddit,
    data: json,
    receivedAt: Date.now()
});

export const receiveSiteDetailsDataError = (subreddit, err, errCode) => ({
    type: SITE_DETAILS_CONSTANTS.RECEIVED_SITE_DETAILS_DATA_ERROR,
    subreddit,
    error: err,
    errorCode: errCode
})

export const fetchSiteDetailsData = (url, subreddit) => dispatch =>
    dispatch(dynamicActionWrapper({
        path: url,
        method: 'get',
        initCb: requestSiteDetailsData,
        successCb: receiveSiteDetailsData,
        failureCb: receiveSiteDetailsDataError,
        subreddit,
        wrapperActionType: 'FETCH_CUSTOMER_SEARCH_RESULT_WRAPPER',
        redirect: 'follow'
    }));
import * as BANKING_CONSTANTS from '../constants/bankingDetails';
import dynamicActionWrapper from '../utills/actionHelpers';




export const requestBankingDetailsData = subreddit => ({
    type: BANKING_CONSTANTS.REQUEST_BANKING_DETAILS_DATA,
    subreddit
})

export const receiveBankingDetailsData = (subreddit, json) => ({
    type: BANKING_CONSTANTS.RECEIVED_BANKING_DETAILS_DATA,
    subreddit,
    data: json,
    receivedAt: Date.now()
});

export const receiveBankingDetailsDataError = (subreddit, err, errCode) => ({
    type: BANKING_CONSTANTS.RECEIVED_BANKING_DETAILS_DATA_ERROR,
    subreddit,
    error: err,
    errorCode: errCode
})

export const fetchBankingDetailsData = (url, subreddit) => dispatch =>
    dispatch(dynamicActionWrapper({
        path: url,
        method: 'get',
        initCb: requestBankingDetailsData,
        successCb: receiveBankingDetailsData,
        failureCb: receiveBankingDetailsDataError,
        subreddit,
        wrapperActionType: 'FETCH_CUSTOMER_SEARCH_RESULT_WRAPPER',
        redirect: 'follow'
    }));
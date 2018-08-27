import * as BANKING_CONSTANTS from '../constants/bankingDetails';
import dynamicActionWrapper from '../utills/actionHelpers';




export const requestBankingDetailsData = subreddit => ({
    type: BANKING_CONSTANTS.REQUEST_BANKING_DETAILS_DATA,
    subreddit
})
export const receiveBankingDetailsData = (subreddit, json, id, resolve) => {
    resolve(json);
  return({
    type: BANKING_CONSTANTS.RECEIVED_BANKING_DETAILS_DATA,
    subreddit,
    data: json,
    receivedAt: Date.now()
  });
};

export  const receiveBankingDetailsDataError = (subreddit, err, errCode, reject) => {
    reject(err);
     return({
        type: BANKING_CONSTANTS.RECEIVED_BANKING_DETAILS_DATA_ERROR,
        subreddit,
        error: err,
        errorCode: errCode
    })
  };


export const fetchBankingDetailsData = (url, subreddit) => dispatch => {
    return new Promise((resolve, reject) => {
    dispatch(dynamicActionWrapper({
        path: url,
        method: 'get',
        initCb: requestBankingDetailsData,
        successCb: receiveBankingDetailsData,
        failureCb: receiveBankingDetailsDataError,
        resolve: resolve,
        reject: reject,
        subreddit,
        wrapperActionType: 'FETCH_CUSTOMER_SEARCH_RESULT_WRAPPER',
        redirect: 'follow'
    }));
    })
}
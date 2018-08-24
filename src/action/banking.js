import * as BANKING_CONSTANTS from '../constants/banking';
import dynamicActionWrapper from '../../src/utills/actionHelpers'

export const requestBankingData = subreddit => ({
    type: BANKING_CONSTANTS.REQUEST_BANKING_DATA,
    subreddit,
  });

  export const receiveBankingData = (subreddit, json) => ({
    type: BANKING_CONSTANTS.RECEIVED_BANKING_DATA,
    subreddit,
    data: json,
    receivedAt: Date.now(),
  });
  
 export  const receiveBankingDataError = (subreddit, err, errCode) => ({
    type: BANKING_CONSTANTS.RECEIVED_BANKING_DATA_ERROR,
    subreddit,
    error: err,
    errorCode: errCode,
  });

export const postBankingData = (data, subreddit, assignOrgUrl) => dispatch =>
  dispatch(dynamicActionWrapper({
    path: assignOrgUrl,
    method: 'Post',
    body: data,
    initCb: requestBankingData,
    successCb: receiveBankingData,
    failureCb: receiveBankingDataError,
    subreddit,
    wrapperActionType: 'POST_ASSING_ORGANIZATIONS_TO_ITEMS_WRAPPER',
  }));


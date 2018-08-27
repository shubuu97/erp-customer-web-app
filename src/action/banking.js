import * as BANKING_CONSTANTS from '../constants/banking';
import dynamicActionWrapper from '../../src/utills/actionHelpers'

export const requestBankingData = subreddit => ({
    type: BANKING_CONSTANTS.REQUEST_BANKING_DATA,
    subreddit,
  });

  export const receiveBankingData = (subreddit, json, id, resolve) => {
    resolve(json);
  return({
    type: BANKING_CONSTANTS.RECEIVED_BANKING_DATA,
    subreddit,
    data: json,
    receivedAt: Date.now(),
  });
};
  
 export  const receiveBankingDataError = (subreddit, err, errCode, reject) => {
  reject(err);
   return({
    type: BANKING_CONSTANTS.RECEIVED_BANKING_DATA_ERROR,
    subreddit,
    error: err,
    errorCode: errCode,
  })
};

export const postBankingData = (data, subreddit, assignOrgUrl) => dispatch => {
  return new Promise((resolve, reject) => {
    dispatch(dynamicActionWrapper({
      path: assignOrgUrl,
      method: 'Post',
      body: data,
      initCb: requestBankingData,
      successCb: receiveBankingData,
      failureCb: receiveBankingDataError,
      resolve: resolve,
      reject: reject,
      subreddit,
      wrapperActionType: 'POST_ASSING_ORGANIZATIONS_TO_ITEMS_WRAPPER',
    }));
}) 
}
  


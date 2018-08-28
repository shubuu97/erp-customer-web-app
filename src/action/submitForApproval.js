import * as APPROVAL_CONSTANTS from '../constants/approval';
import dynamicActionWrapper from '../../src/utills/actionHelpers'


export const requestAppoval = subreddit => ({
    type: APPROVAL_CONSTANTS.REQUEST_APPROVAL_DATA,
    subreddit,
  });

  export const receivedApproval = (subreddit, json,id,resolve) => {
    resolve(json);
  return({
    type: APPROVAL_CONSTANTS.RECEIVED_APPROVAL_DATA,
    subreddit,
    data: json,
    receivedAt: Date.now(),
  });
};
  
 export  const receivedApprovalError = (subreddit, err, errCode,reject) => {
  reject(err);
   return({
    type: APPROVAL_CONSTANTS.RECEIVED_APPROVAL_DATA_ERROR,
    subreddit,
    error: err,
    errorCode: errCode,
  })
};

export const getApprovalStatus = (subreddit, assignOrgUrl) => dispatch =>{
  return new Promise((resolve, reject) => {
  dispatch(dynamicActionWrapper({
    path: assignOrgUrl,
    method: 'Get',
    initCb: requestAppoval,
    successCb: receivedApproval,
    failureCb: receivedApprovalError,
    resolve: resolve,
        reject: reject,
    subreddit,
    wrapperActionType: 'Get Approval data',
  }));
})
}
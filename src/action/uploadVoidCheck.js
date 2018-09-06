import * as UPLOADVOIDCHECK_CONSTANTS from '../constants/uploadVoidCheck'
import dynamicActionWrapper from '../../src/utills/actionHelpers'


// POST OF REGISTER CUSTOMER STARTS HERE

export const requestUploadVoidCheck = subreddit => ({
    type: UPLOADVOIDCHECK_CONSTANTS.REQUEST_UPLOADVOIDCHECK,
    subreddit,
  });

  export const recevieUploadVoidCheck = (subreddit, json,id,resolve) => {
    resolve(json);
  return({
    type: UPLOADVOIDCHECK_CONSTANTS.RECEIVED_UPLOADVOIDCHECK,
    subreddit,
    data: json,
    receivedAt: Date.now(),
  });
};
  
 export  const recevieUploadVoidCheckError = (subreddit, err, errCode,reject) => {
  reject(err);
   return({
    type: UPLOADVOIDCHECK_CONSTANTS.RECEIVED_UPLOADVOIDCHECK_ERROR,
    subreddit,
    error: err,
    errorCode: errCode,
  })
};

export const uploadVoidCheck = ( assignOrgUrl,data, subreddit,) => dispatch =>{
  return new Promise((resolve, reject) => {
  dispatch(dynamicActionWrapper({
    path: assignOrgUrl,
    method: 'POST',
    body: data,
    initCb: requestUploadVoidCheck,
    successCb: recevieUploadVoidCheck,
    failureCb: recevieUploadVoidCheckError,
    resolve: resolve,
    reject: reject,
    subreddit,
    wrapperActionType: 'POST_ASSING_ORGANIZATIONS_TO_ITEMS_WRAPPER',
  }));
})
}



  //POST OF REGISTER CUSTOMER END H
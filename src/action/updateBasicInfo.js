import * as UPDATEBASICINFO_CONSTANTS from '../constants/updateBasicInfo'
import dynamicActionWrapper from '../../src/utills/actionHelpers'


// POST OF REGISTER CUSTOMER STARTS HERE

export const requestUpdateBasicInfo = subreddit => ({
    type: UPDATEBASICINFO_CONSTANTS.REQUEST_UPDATE_BASICINFO,
    subreddit,
  });

  export const receiveUpdateBasicInfo = (subreddit, json,id,resolve) => {
    resolve(json);
  return({
    type: UPDATEBASICINFO_CONSTANTS.RECEIVED_UPDATE_BASICINFO,
    subreddit,
    data: json,
    receivedAt: Date.now(),
  });
};
  
 export  const receiveUpdateBasicInfoError = (subreddit, err, errCode,reject) => {
  reject(err);
   return({
    type: UPDATEBASICINFO_CONSTANTS.RECEIVED_UPDATE_BASICINFO_ERROR,
    subreddit,
    error: err,
    errorCode: errCode,
  })
};

export const patchUpdateBasicInfo = (data, subreddit, assignOrgUrl) => dispatch =>{
  return new Promise((resolve, reject) => {
  dispatch(dynamicActionWrapper({
    path: assignOrgUrl,
    method: 'Patch',
    body: data,
    initCb: requestUpdateBasicInfo,
    successCb: receiveUpdateBasicInfo,
    failureCb: receiveUpdateBasicInfoError,
    resolve: resolve,
        reject: reject,
    subreddit,
    wrapperActionType: 'POST_ASSING_ORGANIZATIONS_TO_ITEMS_WRAPPER',
  }));
})
}



  //POST OF REGISTER CUSTOMER END H
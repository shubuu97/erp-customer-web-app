import * as SITE_CONSTANTS from '../constants/siteInfo';
import dynamicActionWrapper from '../../src/utills/actionHelpers'


// POST OF REGISTER CUSTOMER STARTS HERE

export const requestSiteData = subreddit => ({
    type: SITE_CONSTANTS.REQUEST_SITE_INFO,
    subreddit,
  });

  export const receiveSiteData = (subreddit, json,id,resolve) => {
    resolve(json);
  return({
    type: SITE_CONSTANTS.RECEIVED_SITE_INFO,
    subreddit,
    data: json,
    receivedAt: Date.now(),
  });
};
  
 export  const receiveSiteDataError = (subreddit, err, errCode,reject) => {
  reject(err);
   return({
    type: SITE_CONSTANTS.RECEIVED_SITE_INFO_ERROR,
    subreddit,
    error: err,
    errorCode: errCode,
  })
};

export const postSiteData = (data, subreddit, assignOrgUrl) => dispatch =>{
  return new Promise((resolve, reject) => {
  dispatch(dynamicActionWrapper({
    path: assignOrgUrl,
    method: 'Post',
    body: data,
    initCb: requestSiteData,
    successCb: receiveSiteData,
    failureCb: receiveSiteDataError,
    resolve: resolve,
        reject: reject,
    subreddit,
    wrapperActionType: 'POST_ASSING_ORGANIZATIONS_TO_ITEMS_WRAPPER',
  }));
})
}
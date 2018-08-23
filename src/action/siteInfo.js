import * as SITE_CONSTANTS from '../constants/siteInfo';
import dynamicActionWrapper from '../../src/utills/actionHelpers'


// POST OF REGISTER CUSTOMER STARTS HERE

export const requestSiteData = subreddit => ({
    type: SITE_CONSTANTS.REQUEST_SITE_INFO,
    subreddit,
  });

  export const receiveSiteData = (subreddit, json) => ({
    type: SITE_CONSTANTS.RECEIVED_SITE_INFO,
    subreddit,
    data: json,
    receivedAt: Date.now(),
  });
  
 export  const receiveSiteDataError = (subreddit, err, errCode) => ({
    type: SITE_CONSTANTS.RECEIVED_SITE_INFO_ERROR,
    subreddit,
    error: err,
    errorCode: errCode,
  });

export const postSiteData = (data, subreddit, assignOrgUrl) => dispatch =>
  dispatch(dynamicActionWrapper({
    path: assignOrgUrl,
    method: 'Post',
    body: data,
    initCb: requestSiteData,
    successCb: receiveSiteData,
    failureCb: receiveSiteDataError,
    subreddit,
    wrapperActionType: 'POST_ASSING_ORGANIZATIONS_TO_ITEMS_WRAPPER',
  }));
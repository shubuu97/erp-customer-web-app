import * as LICENSE_CONSTANTS from '../constants/licenseInfo';
import dynamicActionWrapper from '../../src/utills/actionHelpers'


// POST OF REGISTER CUSTOMER STARTS HERE

export const requestLicenseData = subreddit => ({
    type: LICENSE_CONSTANTS.REQUEST_LICENSE_INFO,
    subreddit,
  });

  export const receiveLicenseData = (subreddit, json) => ({
    type: LICENSE_CONSTANTS.RECEIVED_LICENSE_INFO,
    subreddit,
    data: json,
    receivedAt: Date.now(),
  });
  
 export  const receiveLicenseDataError = (subreddit, err, errCode) => ({
    type: LICENSE_CONSTANTS.RECEIVED_LICENSE_INFO_ERROR,
    subreddit,
    error: err,
    errorCode: errCode,
  });

export const postLicenseData = (data, subreddit, assignOrgUrl) => dispatch =>
  dispatch(dynamicActionWrapper({
    path: assignOrgUrl,
    method: 'Post',
    body: data,
    initCb: requestLicenseData,
    successCb: receiveLicenseData,
    failureCb: receiveLicenseDataError,
    subreddit,
    wrapperActionType: 'POST_ASSING_ORGANIZATIONS_TO_ITEMS_WRAPPER',
  }));
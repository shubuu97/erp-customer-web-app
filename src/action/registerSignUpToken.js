import * as REGISTER_TOKEN_CONSTANTS from '../constants/registerToken';
import dynamicActionWrapper from '../../src/utills/actionHelpers'


// POST OF REGISTER CUSTOMER STARTS HERE

export const requestRegisterTokenData = subreddit => ({
  type: REGISTER_TOKEN_CONSTANTS.REQUEST_CUSTOMER_REGISTER_TOKEN,
  subreddit,
});

export const receiveRegsiterTokenData = (subreddit, json,id,resolve) => {
  resolve(json);
  return ({
    type: REGISTER_TOKEN_CONSTANTS.RECEIVED_CUSTOMER_REGISTER_TOKEN,
    subreddit,
    data: json,
    receivedAt: Date.now(),
  });
};

export const receiveRegsiterDataTokenError = (subreddit, err, errCode,reject) => {
  reject(err);
  return ({
    type: REGISTER_TOKEN_CONSTANTS.RECEIVED_CUSTOMER_REGISTER_TOKEN_ERROR,
    subreddit,
    error: err,
    errorCode: errCode,
  })
};

export const postRegisterTokenData = (data, subreddit, assignOrgUrl) => dispatch => {
  return new Promise((resolve, reject) => {

    dispatch(dynamicActionWrapper({
      path: assignOrgUrl,
      method: 'Post',
      body: data,
      initCb: requestRegisterTokenData,
      successCb: receiveRegsiterTokenData,
      failureCb: receiveRegsiterDataTokenError,
      resolve: resolve,
      reject: reject,
      subreddit
    }));
  })
}

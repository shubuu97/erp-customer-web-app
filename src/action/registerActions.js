import * as REGISTER_CONSTANTS from '../constants/register';
import dynamicActionWrapper from '../../src/utills/actionHelpers'


// POST OF REGISTER CUSTOMER STARTS HERE

export const requestRegisterData = subreddit => ({
  type: REGISTER_CONSTANTS.REQUEST_CUSTOMER_REGISTER,
  subreddit,
});

export const receiveRegsiterData = (subreddit, json,id,resolve) => {
  resolve(json);
  return ({
    type: REGISTER_CONSTANTS.RECEIVED_CUSTOMER_REGISTER,
    subreddit,
    data: json,
    receivedAt: Date.now(),
  });
};

export const receiveRegsiterDataError = (subreddit, err, errCode,reject) => {
  reject(err);
  return ({
    type: REGISTER_CONSTANTS.RECEIVED_CUSTOMER_REGISTER_ERROR,
    subreddit,
    error: err,
    errorCode: errCode,
  })
};

export const postCustomerRegisterData = (data, subreddit, assignOrgUrl) => dispatch => {
  return new Promise((resolve, reject) => {

    dispatch(dynamicActionWrapper({
      path: assignOrgUrl,
      method: 'Post',
      body: data,
      initCb: requestRegisterData,
      successCb: receiveRegsiterData,
      failureCb: receiveRegsiterDataError,
      resolve: resolve,
      reject: reject,
      subreddit,
      wrapperActionType: 'POST_ASSING_ORGANIZATIONS_TO_ITEMS_WRAPPER',
    }));
  })
}


  //POST OF REGISTER CUSTOMER END HERE
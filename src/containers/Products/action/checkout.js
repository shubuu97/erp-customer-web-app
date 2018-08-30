import * as CHECKOUT_CONSTANTS from '../constants/checkout';
import dynamicActionWrapper from '../../../utills/actionHelpers'


export const requestCheckoutData = subreddit => ({
    type: CHECKOUT_CONSTANTS.REQUEST_CHECKOUT_ITEM,
    subreddit
})

export const receiveCheckoutData = (subreddit, json,id,resolve) => 
{
resolve(json)
return{
    type: CHECKOUT_CONSTANTS.RECEIVED_CHECKOUT_ITEM,
    subreddit,
    data: json,
    receivedAt: Date.now()
  }
};

export  const receiveCheckoutDataError = (subreddit, err, errCode, reject) => {
    reject(err);
     return({
        type:CHECKOUT_CONSTANTS.RECEIVED_CHECKOUT_ITEM_ERROR,
        subreddit,
        error: err,
        errorCode: errCode
    })
  };


export const postCheckoutData = (url, data,subreddit) => dispatch => {
    return new Promise((resolve, reject) => {
    dispatch(dynamicActionWrapper({
        path: url,
        method: 'post',
        body:data,
        initCb: requestCheckoutData,
        successCb: receiveCheckoutData,
        failureCb: receiveCheckoutDataError,
        resolve: resolve,
        reject: reject,
        subreddit,
        redirect: 'follow'
    }));
    })
}

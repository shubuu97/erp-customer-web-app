import * as orderList from '../../containers/Orders/constants/OrderList';
import dynamicActionWrapper from '../../utills/actionHelpers';
import post from './post'


export const request = (subreddit,constants) =>
{
console.log(constants,"constants")
return ({
    type: constants.init,
    subreddit
})
}
export const receive = (subreddit, json,id,resolve,constants) => 
{
resolve(json)
return{
    type: constants.success,
    subreddit,
    data: json,
    receivedAt: Date.now()
  }
};

export  const receiveError = (subreddit, err, errCode, reject,constants) => {
    reject(err);
     return({
        type:constants.error,
        subreddit,
        error: err,
        errorCode: errCode
    })
  };


export const postData = (url, data,subreddit,constants) => dispatch => {
    return new Promise((resolve, reject) => {
    dispatch(dynamicActionWrapper({
        path: url,
        method: 'post',
        body:data,
        initCb: request,
        successCb: receive,
        failureCb: receiveError,
        resolve: resolve,
        reject: reject,
        subreddit,
        constants,
        redirect: 'follow'
    }));
    })
}

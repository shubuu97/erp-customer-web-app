import * as LOGIN_CONSTANTS from '../constants/login';
import dynamicActionWrapper from '../utills/actionHelpers';



export const requestLogin = subreddit => ({
    type: LOGIN_CONSTANTS.REQUEST_LOGIN,
    subreddit
})
export const receiveLogin = (subreddit, json, id, resolve) => {
    resolve(json);
  return({
    type: LOGIN_CONSTANTS.RECEIVED_LOGIN,
    subreddit,
    data: json,
    receivedAt: Date.now()
  });
};

export  const receiveLoginError = (subreddit, err, errCode, reject) => {
    reject(err);
     return({
        type:LOGIN_CONSTANTS.RECEIVED_LOGIN_ERROR,
        subreddit,
        error: err,
        errorCode: errCode
    })
  };

export const postLogin = (data,subreddit,url) => dispatch => {
    return new Promise((resolve, reject) => {
    dispatch(dynamicActionWrapper({
        path: url,
        method: 'post',
        body:data,
        //headers:{origin:'https://deverp.allonblock.com'}, //extra header
        initCb: requestLogin,
        successCb: receiveLogin,
        failureCb: receiveLoginError,
        resolve: resolve,
        reject: reject,
        subreddit,
        wrapperActionType: '',
        redirect: ''
    }));
    })
}

export const logout = (data,subreddit,url) => dispatch => {
  dispatch({type:LOGIN_CONSTANTS.LOGOUT,data:''})
}

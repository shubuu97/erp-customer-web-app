import * as LOGIN_CONSTANTS from '../constants/login';
import dynamicActionWrapper from '../utills/actionHelpers';



export const requestLogin = subreddit => ({
    type: LOGIN_CONSTANTS.RECEIVED_LOGIN,
    subreddit
})

export const receiveLogin = (subreddit, json) => ({
    type: LOGIN_CONSTANTS.RECEIVED_LOGIN,
    subreddit,
    data: json,
    receivedAt: Date.now()
});

const receiveLoginError = (subreddit,err,errCode) => ({
    type:LOGIN_CONSTANTS.RECEIVED_LOGIN_ERROR,
    subreddit,
    error: err,
    errorCode: errCode
})

export const postLogin = (data,subreddit,url) => dispatch => 
dispatch(dynamicActionWrapper({
    path: url,
    method: 'post',
    body:data,
    //headers:{origin:'https://deverp.allonblock.com'}, //extra header
    initCb: requestLogin,
    successCb: receiveLogin,
    failureCb: receiveLoginError,
    subreddit,
    wrapperActionType: '',
    redirect: ''
}));

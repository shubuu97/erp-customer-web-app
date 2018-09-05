import * as TRACK_CONSTANTS from '../constants/TrackOrder';
import dynamicActionWrapper from '../../../utills/actionHelpers';





export const requestTrackData = subreddit => ({
    type: TRACK_CONSTANTS.REQUEST_TRACK_DATA,
    subreddit
})
export const receiveTrackData = (subreddit, json, id, resolve) => {
    resolve(json);
  return({
    type: TRACK_CONSTANTS.RECEIVED_TRACK_DATA,
    subreddit,
    data: json,
    receivedAt: Date.now()
  });
};

export  const receiveTrackDataError = (subreddit, err, errCode, reject) => {
    reject(err);
     return({
        type: TRACK_CONSTANTS.RECEIVED_TRACK_DATA_ERROR,
        subreddit,
        error: err,
        errorCode: errCode
    })
  };


export const fetchTrackData = (url, subreddit) => dispatch => {
    return new Promise((resolve, reject) => {
    dispatch(dynamicActionWrapper({
        path: url,
        method: 'get',
        initCb: requestTrackData,
        successCb: receiveTrackData,
        failureCb: receiveTrackDataError,
        resolve: resolve,
        reject: reject,
        subreddit,
        wrapperActionType: 'FETCH_CUSTOMER_SEARCH_RESULT_WRAPPER',
        redirect: 'follow'
    }));
    })
}

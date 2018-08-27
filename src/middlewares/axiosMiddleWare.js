import {APPLICATION_BFF_URL} from '../constants/urlConstants'
import {fetchZip} from '../action/fetchFromZip';
import axios from 'axios';
import _isEmpty from 'lodash/isEmpty';
import _pickBy from 'lodash/pickBy';
import { generateV1uuid } from '../utills/helper';
import {setErrorMessage} from '../action/basicInfoActions';
//import actionInterception from './actionInterception';

//import { onLogout } from '../actions/userRoles';

// pure function
const addOptionalOptions = (config, options) => {
  const newOptions = { ...options };
  // if (!_isEmpty(config.body)) {
  if (config.isFormData && _isEmpty(config.body)) {
    newOptions.body = config.formData;
  } else {
    newOptions.body = JSON.stringify(config.body);
  }

  return newOptions;
};

const httpVerbs = {
  post: 'POST',
  get: 'GET',
  put: 'PUT',
  patch: 'PATCH',
  delete: 'DELETE',
};

const axiosMiddleware = store => next => (action) => {
  let authToken = `Bearer ${localStorage.getItem("authToken")}`;
  if (!action || !action.fetchConfig) {
  //actionInterception(next,action,store)
  return next(action)
   }
   
  
  
  const { dispatch } = store;
  const { fetchConfig: config, subreddit, id } = action;
  // @todo multiple params
  dispatch(config.initHandler(subreddit));

  const path = config.path || '/';
  const argMethod = config.method || 'GET';

  const method = httpVerbs[argMethod.toLowerCase()];

  const headers = config.headers && { ...config.headers } || {};
  const successHandler = config.success;
  const resolve = config.resolve;
  const reject = config.reject;
  const failureHandler = config.failure || function (subreddit, error, errCode) {
    return {
      type: 'DUMMY_ERROR', subreddit, error, errCode,
    };
  };

const state = store.getState();

let requestObject = {};
requestObject.method = method;
requestObject.url = path;
if(config.body)
requestObject.data=config.body;
requestObject.headers={...headers,Authorization: `${authToken}`,'Content-Type':'application/json'}





  axios(
    requestObject
  )
    .then(responseData => {
      console.log("========", responseData.data)
      dispatch(successHandler(subreddit, responseData.data, id, resolve))})
    .catch(error => dispatch(failureHandler(subreddit, error, 500, reject)));
};

export default axiosMiddleware;

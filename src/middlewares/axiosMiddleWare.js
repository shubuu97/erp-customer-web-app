
import axios from 'axios';
import _isEmpty from 'lodash/isEmpty';
import _pickBy from 'lodash/pickBy';
import { generateV1uuid } from '../utills/helper';
let authToken = 'Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI1YWNmNzI1NjI5MjNiMTAwMTAyOWZlZDYiLCJ1c2VyTmFtZSI6IkFPQjY3Njc2NyIsImNvbXBhbnlJZHMiOlsiNWFkODY5ZjA0NzI4ODUwMDExZDc1OTc4Il0sInVzZXJDb21wYW55SWQiOiI1YWQ4NjlmMDQ3Mjg4NTAwMTFkNzU5NzgiLCJyb2xlSWQiOlt7Il9pZCI6IjVhZmFkNmQ2ZDZiMjYxMDAxMTcxNjM2NCIsIm5hbWUiOiJDb21wYW55IFN1cGVyIEFkbWluIn0seyJfaWQiOiI1YjFmNjFmNDZlNjVmMDAwMTEwMDQwNjgiLCJuYW1lIjoiUE9fQXBwcm92ZXIifSx7Il9pZCI6IjViMjM5YWNlZmZjNDA2MDAxMmNhNDM3ZiIsIm5hbWUiOiJTdXBwbGllcl9BcHByb3ZlciJ9LHsiX2lkIjoiNWIyMzljMTRmZmM0MDYwMDEyY2E0MzgyIiwibmFtZSI6Ikludm9pY2VfQXBwcm92ZXIifV0sImlhdCI6MTUzMjc2NDc2OSwiZXhwIjoxNTM1MzU2NzY5fQ.AZOqHqutY8zb322AP1XQxrWsbIeCY3F0RgC7sqffbrLBzCYSxzWUHEUjT0_Lmg_bdQSnOJgagIt9lMEGz-nW0Uuq0rTfk4Pg7mglG2wXG3KNQpC40dpJ7naMwFUL5GgDUSigjQevoQPQ5Lix1LfxvHUES_6t4oC5-_yv5uNeGNk'

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
  if (!action || !action.fetchConfig) {
    return next(action);
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
requestObject.headers={Authorization: `${authToken}`,'Content-Type':'application/json'}




  axios(
    requestObject
  )
    .then(responseData => dispatch(successHandler(subreddit, responseData.data, id, action.successCbPassOnParams)))
    .catch(error => dispatch(failureHandler(subreddit, error, 500)));
};

export default axiosMiddleware;

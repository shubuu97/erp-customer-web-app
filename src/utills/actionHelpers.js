const dynamicActionWrapper = ({
    id,
    path,
    isFormData,
    formData,
    method,
    body,
    headers,
    initCb,
    successCb,
    failureCb,
    subreddit,
    wrapperActionType,
    mode,
    redirect,
    credentials,
    cache,
    referrer,
    referrerPolicy,
    integrity,
    keepalive,
    signal,
    successCbPassOnParams,
  }) => ({
    type: wrapperActionType,
    subreddit,
    id,
    successCbPassOnParams,
    fetchConfig: {
      path,
      method,
      isFormData,
      formData,
      body,
      headers,
      initHandler: initCb,
      success: successCb,
      failure: failureCb,
      passOnParams: {
        mode,
        redirect,
        credentials,
        cache,
        referrer,
        referrerPolicy,
        integrity,
        keepalive,
        signal,
      },
    },
  });
  
  export const actionReqName = actionName => `REQUEST_${actionName}`;
  
  export const actionSuccessName = actionName => `RECEIVED_${actionName}_SUCCESS`;
  
  export const actionFailName = actionName => `RECEIVED_${actionName}_FAILURE`;
  
  export const actionFetchName = actionName => `FETCH_${actionName}_DATA`;
  
  export default dynamicActionWrapper;
  
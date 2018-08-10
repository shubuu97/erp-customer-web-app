// const clearUserRole = subreddit => ({
//     type: USER_ROLE_CONSTANTS.CLEAR_USER_ROLE,
//     subreddit,
//   });

// export const onLogout = (subreddit, data) => (dispatch) => {
//     localStorage.clear();
//     dispatch(clearUserRole(subreddit));
//     persistor.purge();
//     persistor.flush();
  
//     // Create and dispatch the action which will cause redux-persist to purge
//     dispatch({
//       type: PURGE,
//       key: 'myStorageKey', // Whatever you chose for the "key" value when initialising redux-persist in the **persistCombineReducers** method - e.g. "root"
//       result: () => null, // Func expected on the submitted action.
//     });
//     localStorage.clear();
//   };
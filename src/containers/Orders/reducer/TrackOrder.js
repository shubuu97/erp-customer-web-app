import * as TRACK_CONSTANTS from '../constants/TrackOrder';

const TrackData = (state = {
  type: '',
  error: '',
  isFetching: false,
  didInvalidate: false,
  trackData: {}
}, action) => {
  switch (action.type) {

    case TRACK_CONSTANTS.REQUEST_TRACK_DATA:
      return Object.assign({}, state, {
        isFetching: true,
        type: action.type,
        lastUpdated: action.receivedAt
      });
    case TRACK_CONSTANTS.RECEIVED_TRACK_DATA:
      return Object.assign({}, state, {
        isFetching: false,
        type: action.type,
        didInvalidate: false,
        trackData: action.data,
        lastUpdated: action.receivedAt
      });
    case TRACK_CONSTANTS.RECEIVED_TRACK_DATA_ERROR:
      return Object.assign({}, state, {
        isFetching: false,
        type: action.type,
        error: action.error
      })
    default:
      return state
  }
}
export default TrackData;
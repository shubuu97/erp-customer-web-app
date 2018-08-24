import * as LICENSE_CONSTANTS from '../constants/licenseDetails';

export const   licenseDetailsData = (state = {
    type: '',
    error: '',
    isFetching: false,
    didInvalidate: false,
    lookUpData: {},
}, action) => {
    switch (action.type) {

        case LICENSE_CONSTANTS.REQUEST_LICENSE_DETAILS_DATA:
            return Object.assign({}, state, {
                isFetching: true,
                type: action.type,
                lastUpdated: action.receivedAt,
                
            });
        case LICENSE_CONSTANTS.RECEIVED_LICENSE_DETAILS_DATA:
            return Object.assign({}, state, {
                isFetching: false,
                type: action.type,
                didInvalidate: false,
                lookUpData: action.data,
                lastUpdated: action.receivedAt
            });
        case LICENSE_CONSTANTS.RECEIVED_LICENSE_DETAILS_DATA_ERROR:
            return Object.assign({}, state, {
                isFetching: false,
                type: action.type,
                lookUpData: {},
                error: action.error
            })

        default:
            return state
    }
}
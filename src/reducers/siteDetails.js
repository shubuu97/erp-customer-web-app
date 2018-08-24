import * as SITE_CONSTANTS from '../constants/siteDetails';

export const   siteDetailsData = (state = {
    type: '',
    error: '',
    isFetching: false,
    didInvalidate: false,
    lookUpData: {},
}, action) => {
    switch (action.type) {

        case SITE_CONSTANTS.REQUEST_SITE_DETAILS_DATA:
            return Object.assign({}, state, {
                isFetching: true,
                type: action.type,
                lastUpdated: action.receivedAt
            });
        case SITE_CONSTANTS.RECEIVED_SITE_DETAILS_DATA:
            return Object.assign({}, state, {
                isFetching: false,
                type: action.type,
                didInvalidate: false,
                lookUpData: action.data,
                lastUpdated: action.receivedAt
            });
        case SITE_CONSTANTS.RECEIVED_SITE_DETAILS_DATA_ERROR:
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
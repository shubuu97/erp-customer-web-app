import * as BANKING_CONSTANTS from '../constants/bankingDetails';

export const   bankDetailsData = (state = {
    type: '',
    error: '',
    isFetching: false,
    didInvalidate: false,
    formSearchData: [],
}, action) => {
    console.log(action)
    switch (action.type) {

        case BANKING_CONSTANTS.REQUEST_BANKING_DETAILS_DATA:
            return Object.assign({}, state, {
                isFetching: true,
                type: action.type,
                lastUpdated: action.receivedAt
            });
        case BANKING_CONSTANTS.RECEIVED_BANKING_DETAILS_DATA:
            return Object.assign({}, state, {
                isFetching: false,
                type: action.type,
                didInvalidate: false,
                formSearchData: action.data,
                lastUpdated: action.receivedAt
            });
        case BANKING_CONSTANTS.RECEIVED_BANKING_DETAILS_DATA_ERROR:
            return Object.assign({}, state, {
                isFetching: false,
                type: action.type,
                error: action.error
            })

        default:
            return state
    }
}

import * as CONSTANTS from '../constants/GetAddress'
   const AddressData = (state = {
    type: '',
    error: '',
    isFetching: false,
    didInvalidate: false,
    lookUpData: {}
}, action) => {
    switch (action.type) {

        case CONSTANTS.REQUEST_ADDRESS_DATA:
            return Object.assign({}, state, {
                isFetching: true,
                type: action.type,
                lastUpdated: action.receivedAt
            });
        case CONSTANTS.RECEIVED_ADDRESS_DATA:
            return Object.assign({}, state, {
                isFetching: false,
                type: action.type,
                didInvalidate: false,
                lookUpData: action.data,
                lastUpdated: action.receivedAt
            });
        case CONSTANTS.RECEIVED_ADDRESS_DATA_ERROR:
            return Object.assign({}, state, {
                isFetching: false,
                type: action.type,
                lookUpData:{},
                error: action.error
            })

        default:
            return state
    }
}

export default AddressData
import * as FORMDATA_CONSTANTS from '../constants/formData'



export const   profileFormData = (state = {
    type: '',
    error: '',
    isFetching: false,
    didInvalidate: false,
    formSearchData: [],
}, action) => {
    switch (action.type) {

        case FORMDATA_CONSTANTS.REQUEST_FORM_DATA:
            return Object.assign({}, state, {
                isFetching: true,
                type: action.type,
                lastUpdated: action.receivedAt
            });
        case FORMDATA_CONSTANTS.RECEIVED_FORM_DATA:
            return Object.assign({}, state, {
                isFetching: false,
                type: action.type,
                didInvalidate: false,
                formSearchData: action.data.data,
                lastUpdated: action.receivedAt
            });
        case FORMDATA_CONSTANTS.RECEIVED_FORM_DATA_ERROR:
            return Object.assign({}, state, {
                isFetching: false,
                type: action.type,
                error: action.error
            })

        default:
            return state
    }
}


import * as BASICINFO_CONSTANTS from '../constants/basicInfo';


const commonBasicInfoReducer = (state = 'basicInfoState', action) => {
    switch (action.type) {
        default:
            return state
    }
}


export const   basicInfodata = (state = {
    type: '',
    error: '',
    isFetching: false,
    didInvalidate: false,
    basicInfoSearchData: [],
    message: ''
}, action) => {
    switch (action.type) {

        case BASICINFO_CONSTANTS.REQUEST_BASICINFO_DATA:
            return Object.assign({}, state, {
                isFetching: true,
                type: action.type,
                lastUpdated: action.receivedAt
            });
        case BASICINFO_CONSTANTS.RECEIVED_BASICINFO_DATA:
            return Object.assign({}, state, {
                isFetching: false,
                type: action.type,
                didInvalidate: false,
                basicInfoData: action.data.data.basicInfo,
                lastUpdated: action.receivedAt
            });
        case BASICINFO_CONSTANTS.RECEIVED_BASICINFO_DATA_ERROR:
            return Object.assign({}, state, {
                isFetching: false,
                type: action.type,
                error: action.error
            })
        case BASICINFO_CONSTANTS.SET_ERROR_MESSAGE:
            return Object.assign({}, state, {
                type: action.type,
                message: action.data
            })

        default:
            return state
    }
}

const basicInfoReducer = (state = {}, action) => {

    switch (action.type) {

        case BASICINFO_CONSTANTS.REQUEST_BASICINFO_DATA:
        case BASICINFO_CONSTANTS.RECEIVED_BASICINFO_DATA:
        case BASICINFO_CONSTANTS.RECEIVED_BASICINFO_DATA_ERROR:
            return {
                ...state,
                [action.subreddit]:basicInfodata(state[action.subreddit], action)
            }

        default:
            return {
                ...state,
                [action.subreddit]: basicInfodata(state[action.subreddit], action)
            }
    }
}




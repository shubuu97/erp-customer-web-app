import * as CATEGORY_TYPE_ITEMS_CONSTANTS from '../../src/constants/categoryTypeAndItems'
import  productData from '../containers/Products/ProductList/productData'


const categoryTypeAndItems = (state = {
    type: '',
    error: '',
    isFetching: false,
    categoryTypeAndItems: {},
    meta: {}
}, action) => {
    switch (action.type) {
        case CATEGORY_TYPE_ITEMS_CONSTANTS.REQUEST_CATEGORY_TYPE_AND_ITEMS:
            return Object.assign({}, state, {
                isFetching: true,
                type: action.type,
                lastUpdated: action.receivedAt,
            });
        case CATEGORY_TYPE_ITEMS_CONSTANTS.RECEIVED_CATEGORY_TYPE_AND_ITEMS:
        
            return Object.assign({}, state, {
                error: '',
                isFetching: false,
                type: action.type,
                categoryTypeAndItems: productData.data,
                meta: action.subreddit,
                lastUpdated: action.receivedAt,
            });
        case CATEGORY_TYPE_ITEMS_CONSTANTS.RECEIVED_CATEGORY_TYPE_AND_ITEMS_ERROR:
            return Object.assign({}, state, {
                isFetching: false,
                type: action.type,
                error: action.error,
                categoryTypeAndItems: {},
                lastUpdated: action.receivedAt
            });
    }
    return state;
}

export default categoryTypeAndItems;
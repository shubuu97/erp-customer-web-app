import {APPLICATION_BFF_URL} from '../../../constants/urlConstants';
export const CHECKOUT_URL = `${APPLICATION_BFF_URL}/customer/orders`;
export const REQUEST_CHECKOUT_ITEM = 'REQUEST_CHECKOUT_ITEM';
export const RECEIVED_CHECKOUT_ITEM = 'RECEIVED_CHECKOUT_ITEM';
export const RECEIVED_CHECKOUT_ITEM_ERROR = 'RECEIVED_CHECKOUT_ITEM_ERROR';
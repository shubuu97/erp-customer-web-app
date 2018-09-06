import {combineReducers} from 'redux';
import {reducer as formReducer}  from 'redux-form';
import registerReducer from './registerReducers';
import {basicInfodata} from './basicInfo';
import {profileFormData} from './profileFormData';
import loginReducer from './login';
import updateBasicInfo from './updateBasicInfo'
import {bankDetailsData} from './bankingDetails'
import updateLicenseData from './licenseInfo'
import updateSiteData from './siteInfo'
import {siteDetailsData} from './siteDetails'
import {licenseDetailsData} from './licenseDetails'
import zipCodeData from './zipCode'
import productData from '../containers/Products/reducers/product';
import orderData from  '../containers/Products/reducers/checkout';
import commonData from './common';
import approvaldata from './approval';
import categoryData from './category';
import categoryTypeAndItems from './categoryTypeAndItems';
import * as Log from '../constants/login';
import OrderListData from '../containers/Orders/reducer/orderList'
import TrackData from '../containers/Orders/reducer/TrackOrder'
let appReducer = combineReducers(
    {
        //reducer code will come here
        form:formReducer,
        registerReducer,
        basicInfodata,
        urlLinks:profileFormData,
        loginReducer,
        updateBasicInfo,
        bankDetailsData,
        updateLicenseData,
        updateSiteData,
        siteDetailsData,
        licenseDetailsData,
        zipCodeData,
        productData,
        commonData,
        approvaldata,
        orderData,
        categoryData,
        OrderListData,
        categoryTypeAndItems,
        TrackData
    }
);
const rootReducer = (state, action) => {
    if (action.type === Log.LOGOUT) {
      state = undefined
    }
  
    return appReducer(state, action)
  }
export default rootReducer;
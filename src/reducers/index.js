import {combineReducers} from 'redux';
import {reducer as formReducer}  from 'redux-form';
import registerReducer from './registerReducers';
import {basicInfodata} from './basicInfo';
import {profileFormData} from './profileFormData';
import loginReducer from './login';
import updateBasicInfo from './updateBasicInfo'
import {bankDetailsData} from './bankingDetails'
import licenseData from './licenseInfo'
import siteData from './siteInfo'
import {siteDetailsData} from './siteDetails'
import {licenseDetailsData} from './licenseDetails'
import zipCodeData from './zipCode'
import productData from '../containers/Products/reducers/product';
import commonData from './common';
let rootReducer = combineReducers(
    {
        //reducer code will come here
        form:formReducer,
        registerReducer,
        basicInfodata,
        profileFormData,
        loginReducer,
        updateBasicInfo,
        bankDetailsData,
        licenseData,
        siteData,
        siteDetailsData,
        licenseDetailsData,
        zipCodeData,
        productData,
        commonData
    }
);

export default rootReducer;
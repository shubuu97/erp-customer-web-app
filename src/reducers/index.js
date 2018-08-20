import {combineReducers} from 'redux';
import {reducer as formReducer}  from 'redux-form';
import registerReducer from './registerReducers';
import {basicInfodata} from './basicInfo';
import {profileFormData} from './profileFormData';
import loginReducer from './login'
let rootReducer = combineReducers(
    {
        //reducer code will come here
        form:formReducer,
        registerReducer,
        basicInfodata,
        profileFormData,
        loginReducer
    }
);

export default rootReducer;
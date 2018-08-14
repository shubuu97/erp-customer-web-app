import {combineReducers} from 'redux';
import {reducer as formReducer}  from 'redux-form';
import registerReducer from './registerReducers'
let rootReducer = combineReducers(
    {
        //reducer code will come here
        form:formReducer,
        registerReducer
    }
);

export default rootReducer;
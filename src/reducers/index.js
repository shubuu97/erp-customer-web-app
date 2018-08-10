import {combineReducers} from 'redux';
import {reducer as formReducer}  from 'redux-form';

let rootReducer = combineReducers(
    {
        //reducer code will come here
        form:formReducer
    }
);

export default rootReducer;
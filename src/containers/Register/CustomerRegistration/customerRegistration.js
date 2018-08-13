import React,{PureComponent} from 'react';
import CustomerRegister from '../../../components/Register/CustomerRegistration/customerRegistration.js';

import {reduxForm} from 'redux-form'
class CustomerRegistration extends PureComponent
{
 render()
 {
   return(
       <div>
           <CustomerRegister />
        </div>
   )
 }   
}


export default reduxForm(
 {form:'CustomerRegistration'}
)(CustomerRegistration)
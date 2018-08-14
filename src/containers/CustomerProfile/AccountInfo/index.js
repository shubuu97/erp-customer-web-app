import CustomerRegistration from '../../../components/Register/CustomerRegistration/customerRegistration';

import React,{Component} from 'react';

import {reduxForm} from 'redux-form';


class CustomerInfo extends Component
{
    render()
    {
        return(
            <div>
            <CustomerRegistration/>
            </div>
        )
    }
}

export default reduxForm({
    form:'CustomeInfo',
    initialValues:{firstName:'Allonblcik',
    middleName:'',
   lastName:'jj',
   emailId:'jay@allonblock',
  designation:'software engineer',
locationAddress:"529,5th Floor",
city:'Jaipur',
state:'Rajasthan',
country:'India',
zipCode:'302020'}
})(CustomerInfo)
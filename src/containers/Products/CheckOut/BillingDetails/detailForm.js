import React,{Component} from 'react';
import {TextFieldInput} from '../../../../components/common/MaterialUiComponents';
import {Field} from 'redux-form';

export default class BillingDetails extends Component
{
render()
{
    return(
        <div>
        <Field name="firstName" label="First Name" component={TextFieldInput}/>
        <Field name="lastName" label="Last Name" component={TextFieldInput}/>
        <Field name="streetAddress" label="Street Address" component={TextFieldInput}/>
        <Field name="zipCode" label = "Zip Code " component={TextFieldInput}/>
        <Field name="country" label = "Country" component={TextFieldInput}/>
        <Field name="state" label = "State" component={TextFieldInput}/>
        <Field name="city" label = "City" component={TextFieldInput}/>

        <Field name="email" label="Email Address" component={TextFieldInput}/>
        <Field name="phone" label="Phone" component={TextFieldInput}/>
        </div>


    )
}
}



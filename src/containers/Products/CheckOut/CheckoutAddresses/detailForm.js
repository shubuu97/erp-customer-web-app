import React,{Component} from 'react';
import {TextFieldInput} from '../../../../components/common/MaterialUiComponents';
import {Field} from 'redux-form';
import info from './../../../../assets/images/info.png';

export default class BillingDetails extends Component
{
render()
{
    return(
        <div className="row d-flex">
            {!this.props.hideEmail && <div className="form-d col-md-12 flex-form">
                <Field name="email" label="Email Address" component={TextFieldInput}/>
                <img src={info} />
            </div>}
            <div className="form-d col-sm-6">
                <Field name="fullName" label="Name *" component={TextFieldInput} autoFocus={true} />
            </div>
            {this.props.addContact ? <div className="form-d col-sm-6">
                <Field name="contactNumber" label="Contact No *" component={TextFieldInput} autoFocus={false}/>
            </div> : null}
            <div className="form-d col-md-12">
                <Field name="address" label="Address *" component={TextFieldInput} autoFocus={false}/>
            </div>
            <div className="form-d col-md-6">
                <Field name="zipCode" label = "Zip/Postal Code *" component={TextFieldInput} autoFocus={false}/>
            </div>
            <div className="form-d col-md-6">
                <Field name="city" label = "City *" component={TextFieldInput} autoFocus={false} />
            </div>
            <div className="form-d col-md-6">
                <Field name="state" label = "State/Province *" component={TextFieldInput} autoFocus={false}/>
            </div> 
            <div className="form-d col-md-6">
                <Field name="country" label = "Country *" component={TextFieldInput} autoFocus={false}/>
            </div>
            {/* <div className="form-d col-md-4 col-sm-6">
                <Field name="phone" label="Phone" component={TextFieldInput}/>
            </div> */}
        </div>


    )
}
}



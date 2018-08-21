//import {addressInfo,basicInfo} from './customerRegisterFields.js';
import { Field } from 'redux-form';
import React, { Component } from 'react';
import { TextFieldInput,SelectFieldInput } from '../../common/MaterialUiComponents';
import Button from '@material-ui/core/Button';
import MenuItem from 'material-ui/MenuItem';
import BasicInfo from '../../common/BasicInfo/BasicInfoFields';
import AddressInfo from '../../common/AddressInfo/adddressInfoFields';
let props ={};
props.country = ['India','China'];
props.state = ['Rajasthan','Karnatak'];
props.city = ['jaipur','banglaore'];

export default class CustomerRegistration extends Component {
    render() {
        return (
            <div>
                <div className="row m-8">
                    <div className="form-d form-input p-8 col-sm-4">
                        <Field name='firstName' label={'First Name'} component={TextFieldInput} />
                    </div>
                    <div className="form-d form-input p-8 col-sm-4">
                        <Field name='middleName' label={'Middle Name'} component={TextFieldInput} />
                    </div>
                    <div className="form-d form-input p-8 col-sm-4">
                        <Field name={'lastName'} label='Last Name' component={TextFieldInput} />
                    </div>
                </div>
                <div className="row">
                    <div className="col-sm-12 form-d form-input">
                        <Field name='email' label='Email' component={TextFieldInput} />
                    </div>
                </div>
                <div className="row m-8">
                    <div className="col-sm-6 p-8 form-d form-input">
                        <Field name='address' label='Location Address' component={TextFieldInput} />
                    </div>
                    <div className="col-sm-6 p-8 form-d form-input">
                        <Field name='zipCode' label='Zip Code' component={TextFieldInput} />
                    </div>
                </div>
                <div className="row m-8">
                    <div className="form-d form-input p-8 col-sm-4">
                        <Field name='country' label={'Country'} component={TextFieldInput} />
                    </div>
                    <div className="form-d form-input p-8 col-sm-4">
                        <Field name='state' label={'State'} component={TextFieldInput} />
                    </div>
                    <div className="form-d form-input p-8 col-sm-4">
                        <Field name={'city'} label='City' component={TextFieldInput} />
                    </div>
                </div>
            </div>
        )
    }
}
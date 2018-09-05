import companyFields from './companyRegisterFields.js';
import { Field } from 'redux-form';
import React, { Component } from 'react';
import { TextFieldInput } from '../../common/MaterialUiComponents';
import Button from '@material-ui/core/Button';

export default class CompanyRegistration extends Component {
    render() {
        return (
            <div>
                        <div className="row d-flex">
                            <div className="col-sm-12 form-d form-d-full form-input">
                                <Field name='companyName' label='Company Name' component={TextFieldInput} />
                            </div>
                        </div>
                        <div className="row m-8 d-flex">
                            <div className="form-d form-d-full form-input p-8 col-sm-4">
                                <Field name='firstName' label={'First Name'} component={TextFieldInput} />
                            </div>
                            <div className="form-d form-d-full form-input p-8 col-sm-4">
                                <Field name='middleName' label={'Middle Name'} component={TextFieldInput} />
                            </div>
                            <div className="form-d form-d-full form-input p-8 col-sm-4">
                                <Field name='lastName' label='Last Name' component={TextFieldInput} />
                            </div>
                        </div>
                        <div className="row d-flex">
                            <div className="col-sm-12 form-d form-d-full form-input">
                                <Field name='email' label='Email' component={TextFieldInput} />
                            </div>
                        </div>
                        <div className="row d-flex">
                            <div className="col-sm-12 form-d form-d-full form-input">
                                <Field name='designation' label='Designation' component={TextFieldInput} />
                            </div>
                        </div>
                
                
            </div>
        )
    }
}
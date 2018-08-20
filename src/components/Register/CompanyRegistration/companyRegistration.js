import companyFields from './companyRegisterFields.js';
import { Field } from 'redux-form';
import React, { Component } from 'react';
import { TextFieldInput } from '../../common/MaterialUiComponents';
import RaiseButton from 'material-ui/RaisedButton';

export default class CompanyRegistration extends Component {
    render() {
        return (
            <div  className="row d-flex">
                {companyFields.map((companyField) => {
                    return (
                        <div className="form-d col-md-4 col-sm-6 form-input">
                            <Field name={companyField.name} label={companyField.label} component={TextFieldInput} />
                        </div>) 
                }
                )}
            </div>
        )
    }
}
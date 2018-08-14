import Account from './companyRegisterFields.js';
import { Field } from 'redux-form';
import React, { Component } from 'react';
import { TextFieldInput } from '../../common/MaterialUiComponents';
import RaiseButton from 'material-ui/RaisedButton';

export default class AccountInfo extends Component {
    render() {
        return (
            <div>
                {companyFields.map((companyField) => {
                    return (
                        <Field name={companyField.name} label={companyField.label} component={TextFieldInput} />)
                }
                )}
                <RaiseButton label='Register' />
            </div>
        )
    }
}
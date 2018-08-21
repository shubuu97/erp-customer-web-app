import Account from './companyRegisterFields.js';
import { Field } from 'redux-form';
import React, { Component } from 'react';
import { TextFieldInput } from '../../common/MaterialUiComponents';
import Button from '@material-ui/core/Button';

export default class AccountInfo extends Component {
    render() {
        return (
            <div>
                {companyFields.map((companyField) => {
                    return (
                        <Field name={companyField.name} label={companyField.label} component={TextFieldInput} />)
                }
                )}
                <Button variant="contained" color='primary'>Register</Button>
            </div>
        )
    }
}
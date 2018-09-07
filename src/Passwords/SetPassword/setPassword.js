
import { Field } from 'redux-form';
import React, { Component } from 'react';

import FormGroup from 'react-bootstrap/lib/FormGroup';
import FormControl from 'react-bootstrap/lib/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import Button from '@material-ui/core/Button';
import { reduxForm } from 'redux-form';
import { TextFieldInput } from '../../components/common/MaterialUiComponents'
import logologin from '../../assets/images/logo-main.png';

class SetPassword extends Component {

    render() {
        return (
            <div className="login-container">
                <div className="login">
                    <div className="login-logo">
                        <img src={logologin} />
                    </div>
                    <div className="form-d col-sm-12">
                        <Field name={'newPassword'} label={'New Password'} placeholder={'New Password'} component={TextFieldInput} />
                    </div>
                    <div className="form-d col-sm-12">
                        <Field name={'confirmNewPassword'} label={'Confirm New Password'} placeholder={'Confirm New Password'} component={TextFieldInput} />
                    </div>
                    <div className="btn-parent-full">
                        <Button type='submit' variant="contained" color='primary' label="Submit">Submit</Button>
                    </div>
                </div>
            </div>
        )
    }
}

export default reduxForm(
    { form: 'reset' }
)(SetPassword)
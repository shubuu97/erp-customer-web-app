
import { Field } from 'redux-form';
import React, { Component } from 'react';

import FormGroup from 'react-bootstrap/lib/FormGroup';
import FormControl from 'react-bootstrap/lib/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import Button  from '@material-ui/core/Button';
import {reduxForm} from 'redux-form';
import {TextFieldInput} from '../../../components/common/MaterialUiComponents'


 class ResetPassword extends Component {

	render() {
		return (
			<div>
				<Field name={'password'} label={'Password'} placeholder={'Password'} component={TextFieldInput} />
				<Field name={'newPassword'} label={'New Password'} placeholder={'New Password'} component={TextFieldInput} />
                <Field name={'confirmNewPassword'} label={'Confirm New Password'} placeholder={'Confirm New Password'} component={TextFieldInput} />

                <div className="form-btn-group">
                  <Button type='submit' variant="contained" color='primary'   label="Submit">Submit</Button>
                </div>

			</div>
		)
	}
}

export default reduxForm(
    {form:'reset'}
)(ResetPassword)
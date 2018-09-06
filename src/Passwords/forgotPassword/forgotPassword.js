
import { Field } from 'redux-form';
import React, { Component } from 'react';

import FormGroup from 'react-bootstrap/lib/FormGroup';
import FormControl from 'react-bootstrap/lib/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import Button  from '@material-ui/core/Button';
import {TextFieldInput} from '../../components/common/MaterialUiComponents'
import {reduxForm} from 'redux-form';
import logologin from '../../assets/images/logo-main.png';


class ForgotPassword extends Component {

	render() {
		return (
			<div className="login-container">
				<div className="login">
					<div className="login-logo">
						<img src={logologin} />
					</div>
					<div className="row">
						<div className="col-sm-12">
							<h2 className="forgot-text">Forgot Password</h2>
						</div>
						<div className="form-d col-sm-12">
							<Field name={'email'} label={'Email'} placeholder={'Email'} component={TextFieldInput} />
						</div>
					</div>
					<div className="btn-parent-full">
						<Button type='submit' variant="contained" color='primary'   label="Submit">Submit </Button>
					</div>
				</div>
			</div>
		)
	}
}

export default reduxForm(
    {form:'forgot'}
)(ForgotPassword)
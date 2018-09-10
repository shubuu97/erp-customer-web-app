
import { Field } from 'redux-form';
import React, { Component } from 'react';

import FormGroup from 'react-bootstrap/lib/FormGroup';
import FormControl from 'react-bootstrap/lib/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import Button  from '@material-ui/core/Button';
import {reduxForm} from 'redux-form';
import {TextFieldInput} from '../../../components/common/MaterialUiComponents';
import profileSideBar from '../../../components/profileSideBarHoc';


 class ResetPassword extends Component {

	render() {
		return (
			<div className="col-sm-9">
				<div className="row d-flex">
					<div className="form-d col-sm-12">
						<Field name={'password'} label={'Password'} placeholder={'Password'} component={TextFieldInput} />
					</div>
					<div className="form-d col-sm-12">
						<Field name={'newPassword'} label={'New Password'} placeholder={'New Password'} component={TextFieldInput} />
					</div>
					<div className="form-d col-sm-12">
						<Field name={'confirmNewPassword'} label={'Confirm New Password'} placeholder={'Confirm New Password'} component={TextFieldInput} />
					</div>
				</div>

                <div className="btn-group-margin">
					<Button type='button' variant="contained" color='secondary' label="Back">Back</Button>
				  	<Button type='submit' variant="contained" color='primary' label="Submit">Save & Continue</Button>				  
                </div>

			</div>
		)
	}
}

const ResetPasswordForm =  reduxForm(
    {form:'reset'}
)(ResetPassword)


export default profileSideBar(ResetPasswordForm);
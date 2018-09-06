
import { Field } from 'redux-form';
import React, { Component } from 'react';

import FormGroup from 'react-bootstrap/lib/FormGroup';
import FormControl from 'react-bootstrap/lib/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import Button  from '@material-ui/core/Button';
import {TextFieldInput} from '../../components/common/MaterialUiComponents'


const email = ({ input,
	label,
	meta: { touched, error },
	...custom
}) => {
	return (
		<FormGroup controlId="email" bsSize="large">

			<FormControl
				autoFocus
				type="email"
				name="email"
				onChange={input.onChange}
				placeholder="Email"
			/>
			{touched && error && <div className="text-input error"><FormHelperText >
				{error}
			</FormHelperText>
			</div>}
		</FormGroup>)
}



export default class ForgotPassword extends Component {

	render() {
		return (
			<div>
				<Field name={'email'} label={'Email'} placeholder={'Email'} component={TextFieldInput} />
                <div className="form-btn-group">
                  <Button type='submit' variant="contained" color='primary'   label="Submit">Submit </Button>
                </div>

			</div>
		)
	}
}

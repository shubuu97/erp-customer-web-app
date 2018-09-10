
import { Field } from 'redux-form';
import React, { Component } from 'react';

import FormGroup from 'react-bootstrap/lib/FormGroup';
import FormControl from 'react-bootstrap/lib/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import Button from '@material-ui/core/Button';
import { reduxForm } from 'redux-form';
import { TextFieldInput } from '../../../components/common/MaterialUiComponents';
import profileSideBar from '../../../components/profileSideBarHoc';
import asyncValidate from './validate.js';
import * as SET_PASSWORD_CONSTANT from '../constants/setPassword';
import { APPLICATION_BFF_URL } from '../../../constants/urlConstants';
import { postData } from './../../../action/common/post.js';
import Snackbar from '@material-ui/core/Snackbar';
import { withStyles, withTheme } from '@material-ui/core/styles';

const styles = theme => ({
  failure: {
    background: 'red',
    fontSize: '1.4rem'
  },
  success: {
    background: 'green',
    fontSize: '1.4rem'
  }
});

class ResetPassword extends Component {
  constructor() {
    super();
    this.state = {
      errorMessage: '',
      isSuccess: false,
    }
  }
  handleSubmit = (formData) => {
    console.log(formData);
    let options = {
      init: SET_PASSWORD_CONSTANT.REQUEST_SET_PASSWORD,
      success: SET_PASSWORD_CONSTANT.RECEIVED_SET_PASSWORD,
      error: SET_PASSWORD_CONSTANT.RECEIVED_SET_PASSWORD_ERROR
    }
    let bodyData = {
      passwordType: "resetPassword",
      oldPassword: formData.password,
      newPassword: formData.newPassword,
      confirmPassword: formData.confirmNewPassword
    }
    let userId = localStorage.getItem('userLoginId');
    this.setState({ isLoading: true });
    this.props.dispatch(postData(`${APPLICATION_BFF_URL}/iam/user/password/${userId}`, bodyData, null, options, 'PATCH')).then((success) => {
      console.log("Password success is here", success);
      if (success.data && success.data.code == 202) {
        this.setState({ errorMessage: 'Password updated successfully', isSuccess: true, isLoading: false });
        setTimeout(() => {
          this.setState({ errorMessage: '' });
        }, 6000);
      }
      else {
        this.setState({ errorMessage: 'Error in password updates, Please try again', isSuccess: false });
        setTimeout(() => {
          this.setState({ errorMessage: '' });
        }, 6000);
      }
    }, (error) => {
      this.setState({ errorMessage: error.message, isSuccess: false });
      setTimeout(() => {
        this.setState({ errorMessage: '' });
      }, 6000);
      console.log("Error in set password", error);
    })
  }
  handleOpen = () => {
    return true;
  };
  render() {
    const { handleSubmit, classes, theme } = this.props;
    return (
      <div className="col-sm-9">
        <h2 class="reset-password">Reset Password</h2>
        <form onSubmit={handleSubmit(this.handleSubmit)}>
          <div className="row d-flex">
            <div className="form-d col-sm-12">
              <Field name={'password'} type="password" label={'Password'} placeholder={'Password'} component={TextFieldInput} />
            </div>
            <div className="form-d col-sm-12">
              <Field name={'newPassword'} type="password" label={'New Password'} placeholder={'New Password'} component={TextFieldInput} />
            </div>
            <div className="form-d col-sm-12">
              <Field name={'confirmNewPassword'} type="password" label={'Confirm New Password'} placeholder={'Confirm New Password'} component={TextFieldInput} />
            </div>
          </div>

          <div className="btn-group-margin">
            <Button type='button' variant="contained" color='secondary' label="Back">Back</Button>
            <Button type='submit' variant="contained" color='primary' label="Submit">Save & Continue</Button>
          </div>
        </form>
        {this.state.errorMessage && <Snackbar
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'center',
          }}
          open={this.handleOpen()}
          autoHideDuration={6000}
          onClose={() => { }}
          ContentProps={{
            'aria-describedby': 'message-id',
            classes: {
              root: this.state.isSuccess ? classes.success : classes.failure
            }
          }}
          message={<span id="message-id">{this.state.errorMessage}</span>}
        />}
      </div>
    )
  }
}

const ResetPasswordForm = reduxForm(
  { form: 'reset', asyncValidate }
)(ResetPassword)


export default profileSideBar(withStyles(styles)(ResetPasswordForm));
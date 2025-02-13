
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
import { connect } from 'react-redux';
import paymentIinfo from './../../../assets/images/info.png';

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
          this.props.history.push('/StaticProfileView');
        }, 2000);
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
  componentDidMount() {
    document.body.classList.add('reset-password-page');
  }
  componentWillUnmount() {
    document.body.classList.remove('reset-password-page');
  }
  handleOpen = () => {
    return true;
  };
  goBack() {
    this.props.role == 'customer' ? this.props.history.push('/StaticProfileView') : this.props.history.push('/CompanyStaticProfileView');
  }
  render() {
    const { handleSubmit, classes, theme } = this.props;
    return (
      <div>
        <h2 class="reset-password">Reset Password</h2>
        <form onSubmit={handleSubmit(this.handleSubmit)}>
          <div className="row d-flex">
            <div className="form-d col-md-5">
              <Field name={'password'} type="password" label={'Current Password'} placeholder={'Password'} component={TextFieldInput} />
            </div>
            </div>
            <div className="row d-flex">
            <div className="form-d col-md-5 email-flex">
              <Field name={'newPassword'} type="password" label={'New Password'} placeholder={'New Password'} component={TextFieldInput} />
              {/* <span title="A strong password must contain a Capital a small and numeric and  length should be greater than 8 and must be less than 16">ii</span> */}
              <span className="p-info password-info" title="Valid passwords must:
- include between 8 and 50 characters
- include uppercase, lowercase,numeric,special characters"><img src={paymentIinfo} /></span>
            </div>
            </div>
            <div className="row d-flex">
            <div className="form-d col-md-5">
              <Field name={'confirmNewPassword'} type="password" label={'Confirm New Password'} placeholder={'Confirm New Password'} component={TextFieldInput} />
            </div>
          </div>

          <div className="btn-group-margin">
            <Button type='button' variant="contained" color='secondary' label="Back" onClick={() => this.goBack()}>Back</Button>
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
  {
    form: 'reset', asyncValidate,
    enableReinitialize: true
  }
)(ResetPassword)

const mapStateToProps = state => {
  let role = state.basicInfodata && state.basicInfodata.role;
  return { role }
}
export default connect(mapStateToProps)(profileSideBar(withStyles(styles)(ResetPasswordForm)));

import { Field } from 'redux-form';
import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import { reduxForm } from 'redux-form';
import { withStyles, withTheme } from '@material-ui/core/styles';
import { TextFieldInput } from '../../../components/common/MaterialUiComponents'
import logologin from '../../../assets/images/logo-main.png';
import * as qs from 'query-string';
import { postData } from './../../../action/common/post.js';
import { getData } from './../../../action/common/get.js';
import { connect } from 'react-redux';
import { APPLICATION_BFF_URL } from '../../../constants/urlConstants';
import * as SET_PASSWORD_CONSTANT from '../constants/setPassword';
import Snackbar from '@material-ui/core/Snackbar';
import { get } from 'lodash';
import CircularProgress from '@material-ui/core/CircularProgress';
import asyncValidate from './validate.js';
import { logout } from '../../../action/loginAction';
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
class SetPassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tokenStatus: '',
      errorMessage: '',
      isSuccess: false,
      userInfoFromToken: {},
      isLoading: false
    }
  }
  componentWillMount() {
    const params = qs.parse(this.props.location.search);
    console.log(params.token);
    if (params.token) {
      localStorage.setItem('authToken', params.token);
      let options = {
        init: SET_PASSWORD_CONSTANT.REQUEST_VERIFY_TOKEN,
        success: SET_PASSWORD_CONSTANT.RECEIVED_VERIFY_TOKEN,
        error: SET_PASSWORD_CONSTANT.RECEIVED_VERIFY_TOKEN_ERROR
      }
      this.props.dispatch(getData(`${APPLICATION_BFF_URL}/iam/verify/token`, null, options)).then((tokenSuccess) => {
        console.log('tokenSuccess', tokenSuccess);
        this.setState({ errorMessage: 'User successfully verified', tokenStatus: 'valid', isSuccess: true, userInfoFromToken: tokenSuccess });
        setTimeout(() => {
          this.setState({ errorMessage: '' });
        }, 6000);
      }, (error) => {
        console.log(error);
        this.setState({ errorMessage: 'Token expired send confirmation mail again', tokenStatus: 'expire' });
        setTimeout(() => {
          this.setState({ errorMessage: '' });
        }, 6000);
      });
    } else {
      this.props.history.push('/');
    }
  }
  handleOpen = () => {
    return true;
  };
  handleSubmit = (formData) => {
    console.log(formData);
    console.log(this.state.userInfoFromToken);
    const { userInfoFromToken } = this.state;
    if (formData.newPassword && formData.confirmNewPassword) {
      let updatePasswordUrl = get(userInfoFromToken, 'data._links.updatePassword.href', '');
      if (updatePasswordUrl) {
        let options = {
          init: SET_PASSWORD_CONSTANT.REQUEST_SET_PASSWORD,
          success: SET_PASSWORD_CONSTANT.RECEIVED_SET_PASSWORD,
          error: SET_PASSWORD_CONSTANT.RECEIVED_SET_PASSWORD_ERROR
        }
        let bodyData = {
          passwordType: "setPassword",
          newPassword: formData.newPassword,
          confirmPassword: formData.confirmNewPassword
        }
        this.setState({ isLoading: true });
        this.props.dispatch(postData(updatePasswordUrl, bodyData, null, options, userInfoFromToken.data._links.updatePassword.verb)).then((success) => {
          console.log("Password success is here", success);
          if (success.data && success.data.code == 202) {
            this.setState({ errorMessage: 'Password updated successfully', isSuccess: true, isLoading: false });
            setTimeout(() => {
              this.props.dispatch(logout());
              localStorage.clear();
              this.props.history.push('/');
            }, 3000);
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
    } else {
      let errMsg = !formData.newPassword ? 'Please enter password' : 'Please enter confirm password';
      this.setState({ errorMessage: errMsg, isSuccess: false });
      setTimeout(() => {
        this.setState({ errorMessage: '' });
      }, 6000);
    }
  }
  handleSubmitEmail = (formData) => {
    console.log(formData);
  }

  render() {
    const { handleSubmit, classes, theme } = this.props;
    const { tokenStatus, userInfoFromToken, isLoading } = this.state;
    return (
      <div className="login-container">
        {tokenStatus == 'valid' && <div className="login">
          <div className="login-logo">
            <img src={logologin} />
          </div>
          <form onSubmit={handleSubmit(this.handleSubmit)}>
            {userInfoFromToken.data && userInfoFromToken.data.userInfo && <div className="verify-mail">{userInfoFromToken.data.userInfo.email}</div>}
            <div className="form-d">
              <Field name={'newPassword'} label={'New Password'} type="password" placeholder={'New Password'} component={TextFieldInput} />
          <span className="p-info password-info" title="A strong password must contain a Capital a small and numeric and  length should be greater than 8 and must be less than 16"><img src={paymentIinfo} /></span>
            
            </div>
            <div className="form-d">
              <Field name={'confirmNewPassword'} label={'Confirm New Password'} type="password" placeholder={'Confirm New Password'} component={TextFieldInput} />
            </div>
            <div className="btn-parent-full">
              <Button type='submit' variant="contained" color='primary' label="Submit">Submit</Button>
            </div>
          </form>
        </div>}
        {tokenStatus == 'expire' &&
          <div className="login">
            <div className="login-logo">
              <img src={logologin} />
            </div>
            <form onSubmit={handleSubmit(this.handleSubmitEmail)}>
              <div className="row">
                <div className="col-sm-12">
                  <h2 className="forgot-text">Confirmation email</h2>
                </div>
                <div className="form-d col-sm-12">
                  <Field name={'email'} label={'Email'} placeholder={'Email'} component={TextFieldInput} />
                </div>
              </div>
              <div className="btn-parent-full">
                <Button type='submit' variant="contained" color="primary" label="Submit" disabled={isLoading}>{!isLoading && 'Confirm'}{isLoading && <CircularProgress size={24} />}</Button>
              </div>
            </form>
          </div>
        }
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

const setPasswordForm = reduxForm(
  { form: 'setPasswordForm', asyncValidate }
)(SetPassword)

export default connect()(withStyles(styles)(setPasswordForm));
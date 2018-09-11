
import { Field } from 'redux-form';
import React, { Component } from 'react';

import FormGroup from 'react-bootstrap/lib/FormGroup';
import FormControl from 'react-bootstrap/lib/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import Button from '@material-ui/core/Button';
import { TextFieldInput } from '../../../components/common/MaterialUiComponents'
import { reduxForm } from 'redux-form';
import logologin from '../../../assets/images/logo-main.png';
import asyncValidate from './validate';
import { postData } from './../../../action/common/post.js';
import { APPLICATION_BFF_URL } from '../../../constants/urlConstants';
import Snackbar from '@material-ui/core/Snackbar';
import { withStyles, withTheme } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import { logout } from '../../../action/loginAction';
import { Link } from 'react-router-dom';

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
class ForgotPassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      message: '',
      isSuccess: false,
    }
  }
  handleSubmit = (formData) => {
    console.log(formData);
    let options = {
      init: 'REQUEST_FORGOT_PASSWORD',
      success: 'RECEIVED_FORGOT_PASSWORD',
      error: 'RECEIVED_FORGOT_PASSWORD_ERROR'
    }
    this.props.dispatch(logout());
    localStorage.clear();
    this.props.dispatch(postData(`${APPLICATION_BFF_URL}/forget/password`, { email: formData.email }, null, options, 'POST')).then((success) => {
      console.log("FOrgot success", success);
      this.setState({ message: 'Verification mail is send to registered mail id. Please verify mail for reset password', isSuccess: true });
      setTimeout(() => {
        this.props.history.push('/');
      }, 3000);
      setTimeout(() => {
        this.setState({ message: '' });
      }, 6000);
    }, (error) => {
      console.log(error);
      this.setState({ message: error.message, isSuccess: false });
      setTimeout(() => {
        this.setState({ message: '' });
      }, 6000);
    })
  }
  handleOpen = () => {
    return true;
  };
  render() {
    const { handleSubmit, classes, theme } = this.props;
    return (
      <div className="login-container">
        <div className="login">
          <div className="login-logo">
            <img src={logologin} />
          </div>
          <form onSubmit={handleSubmit(this.handleSubmit)}>
            <div className="row">
              <div className="col-sm-12">
                <h2 className="forgot-text">Forgot Password</h2>
              </div>
              <div className="form-d col-sm-12">
                <Field name={'email'} label={'Email'} placeholder={'Email'} component={TextFieldInput} />
              </div>
            </div>
            <div className="btn-parent-full">
              <Button type='submit' variant="contained" color='primary' label="Submit">Submit </Button>
            </div>
            <div className="sp">
              <Link style={{ textDecoration: 'underline' }} to='/'>back<br /></Link>
            </div>
          </form>
          {this.state.message && <Snackbar
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
            message={<span id="message-id">{this.state.message}</span>}
          />}
        </div>
      </div>
    )
  }
}

const forgotForm = reduxForm(
  { form: 'forgot', asyncValidate }
)(ForgotPassword)

export default connect()(withStyles(styles)(forgotForm));
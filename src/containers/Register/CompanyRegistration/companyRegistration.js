import React, { PureComponent } from 'react';
import CompanyRegister from '../../../components/Register/CompanyRegistration/companyRegistration.js';
import { postCustomerRegisterData } from '../../../action/registerActions'
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';
import Button from '@material-ui/core/Button';
import withLoader from '../../../components/LoaderHoc';
import asyncValidate from './validate.js';
import logologin from '../../../assets/images/logo-main.png';
import withMessage from '../../../components/messageHoc/index';
import { APPLICATION_BFF_URL } from '../../../constants/urlConstants'
import { showMessage } from '../../../action/common';
import { Link } from 'react-router-dom'
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

class CompanyRegistration extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      message: '',
      isSuccess: false
    }
  }
  submit = (formData) => {
    let postData = {};
    postData.basicInfo = {};
    postData.basicInfo.firstName = formData.firstName;
    postData.basicInfo.lastName = formData.lastName;
    postData.basicInfo.middleName = formData.middleName;
    postData.basicInfo.email = formData.email;
    postData.basicInfo.designation = formData.designation;
    postData.basicInfo.companyName = formData.companyName;

    this.props.dispatch(postCustomerRegisterData(postData, 'companyRegister', `${APPLICATION_BFF_URL}/businesscustomer/register`)).then((data) => {
      console.log("Data for company register", data);
      this.props.history.push('/register');
    }, (err) => {
      console.log("Error in company register", err);
      if (err.message) {
        this.setState({ message: err.message, isSuccess: false });
        setTimeout(() => {
          this.setState({ message: '', isSuccess: false });
        }, 6000);
      }
    })
  }
  handleOpen = () => {
    return true;
  };
  render() {

    const { handleSubmit, classes, theme } = this.props;
    return (
      <div className="login-container register">
        <div className="login">
          <div className="login-logo">
            <img src={logologin} />
          </div>
          <form onSubmit={handleSubmit(this.submit)}>
            <h2 className="forgot-text">Company SIgn up</h2>
            <CompanyRegister />
            <div className="btn-parent-full">
              <Button disabled={!this.props.anyTouched || this.props.invalid} variant="contained" color='primary' type='submit' label="Register">Register</Button>
            </div>
            <div className="sp"><span>Already have an account?</span><Link to='/'>Sign In</Link><br /> Join as <Link to='/customerRegister'>Customer</Link>
            </div>
          </form>
          {this.state.message && <Snackbar
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'left',
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

CompanyRegistration = reduxForm(
  {
    form: 'CompanyRegistration',
    asyncValidate
  }
)(CompanyRegistration)

const mapStateToProps = (state) => {
  let isLoading = state.registerReducer.isFetching;
  let registerReducer = state.registerReducer;
  let message = state.registerReducer.lookUpData.message;
  return {
    isLoading,
    registerReducer,
    message
  }
}

export default connect(mapStateToProps)(withStyles(styles)(CompanyRegistration))

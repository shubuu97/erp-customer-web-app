import React, { PureComponent } from 'react';
import CompanyRegister from '../../../components/Register/CompanyRegistration/companyRegistration.js';
import {postCustomerRegisterData} from '../../../action/registerActions'
import {connect} from 'react-redux';
import {reduxForm} from 'redux-form';
import Button from '@material-ui/core/Button';
import withLoader from '../../../components/LoaderHoc';
import asyncValidate from './validate.js';
import logologin from '../../../assets/images/logo-main.png';
import withMessage from '../../../components/messageHoc/index';
import {APPLICATION_BFF_URL} from '../../../constants/urlConstants'

class CompanyRegistration extends PureComponent {
  submit = (formData) => {
    let postData = {};
    postData.basicInfo = {};
    postData.basicInfo.firstName = formData.firstName;
    postData.basicInfo.lastName = formData.lastName;
    postData.basicInfo.middleName = formData.middleName;
    postData.basicInfo.email = formData.email;
    postData.basicInfo.designation = formData.designation;
    postData.basicInfo.companyName = formData.companyName;


    this.props.dispatch(postCustomerRegisterData(postData, 'companyRegister', `${APPLICATION_BFF_URL}/businesscustomer/register`))





  }
  render() {
  
    const { handleSubmit } = this.props;
    return (
      <div className="login-container register">
        <div className="login">
          <div className="login-logo">
              <img src={logologin} />
          </div>
          <form onSubmit={handleSubmit(this.submit)}>
            <CompanyRegister />
            <div className="btn-parent-full">
              <Button variant="contained" color='primary' type='submit' label="Register">Register</Button>
            </div>
          </form>
        </div>
      </div>
    )
  }
}

CompanyRegistration = reduxForm(
  { form: 'CompanyRegistration',
  asyncValidate }
)(CompanyRegistration)

const mapStateToProps = (state) =>
{
  let isLoading = state.registerReducer.isFetching;
  let registerReducer = state.registerReducer;
  let message = state.registerReducer.lookUpData.message;
  return {
    isLoading,
    registerReducer,
    message
  }
}

export default connect(mapStateToProps)(withMessage(withLoader(CompanyRegistration)))

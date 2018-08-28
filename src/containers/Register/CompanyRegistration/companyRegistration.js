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
import {showMessage} from '../../../action/common';

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

    localStorage.setItem("authToken", "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI1YWNmNzI1NjI5MjNiMTAwMTAyOWZlZDYiLCJ1c2VyTmFtZSI6IkFPQjY3Njc2NyIsImNvbXBhbnlJZHMiOlsiNWFkODY5ZjA0NzI4ODUwMDExZDc1OTc4Il0sInVzZXJDb21wYW55SWQiOiI1YWQ4NjlmMDQ3Mjg4NTAwMTFkNzU5NzgiLCJyb2xlSWQiOlt7Il9pZCI6IjVhZmFkNmQ2ZDZiMjYxMDAxMTcxNjM2NCIsIm5hbWUiOiJDb21wYW55IFN1cGVyIEFkbWluIn0seyJfaWQiOiI1YjFmNjFmNDZlNjVmMDAwMTEwMDQwNjgiLCJuYW1lIjoiUE9fQXBwcm92ZXIifSx7Il9pZCI6IjViMjM5YWNlZmZjNDA2MDAxMmNhNDM3ZiIsIm5hbWUiOiJTdXBwbGllcl9BcHByb3ZlciJ9LHsiX2lkIjoiNWIyMzljMTRmZmM0MDYwMDEyY2E0MzgyIiwibmFtZSI6Ikludm9pY2VfQXBwcm92ZXIifSx7Il9pZCI6IjViNzE2M2M2ZmY0NmEwMDAxN2RhYTU1YSIsIm5hbWUiOiJDdXN0b21lciJ9XSwiaWF0IjoxNTM1NDM0NTExLCJleHAiOjE1MzgwMjY1MTF9.REUSC2WYRhYyRpSrYvTLR6nqAim3SjcMZk1qruDocDlhsw4yIB-GEWe_v2UIiE7uv3w3vXquAC0cF-GcsWPgE1yhwO_Yu2mhB_1L9vUZHQ3roPUYbbyJeIo_PNps64hlfvCqDNwn-8PH6Oq5D4WJCpLF6XixbPREzjvuJsPUZD0");
    this.props.dispatch(postCustomerRegisterData(postData, 'companyRegister', `${APPLICATION_BFF_URL}/businesscustomer/register`)).then((data)=>{
      console.log("Data for company register", data);
      if(data.message) {
        this.props.dispatch(showMessage(data.message));
        setTimeout(()=>{
          this.props.dispatch(showMessage(''));
        },6000);
      }
    }, (err)=>{
      console.log("Error in company register", err);
      if(err.message) {
        this.props.dispatch(showMessage(err.message));
        setTimeout(()=>{
          this.props.dispatch(showMessage(''));
        },6000);
      }
    })





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

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
import {Link} from 'react-router-dom'
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

    this.props.dispatch(postCustomerRegisterData(postData, 'companyRegister', `${APPLICATION_BFF_URL}/businesscustomer/register`)).then((data)=>{
      console.log("Data for company register", data);
        this.props.dispatch(showMessage({text: "Successful Operation", isSuccess: true}));
        this.props.history.push('/register');
        setTimeout(()=>{
          this.props.dispatch(showMessage({text: "", isSuccess: true}));
        },6000);
      }
    , (err)=>{
      console.log("Error in company register", err);
      
        this.props.dispatch(showMessage({text: err.message, isSuccess: false}));
        setTimeout(()=>{
          this.props.dispatch(showMessage({text: "", isSuccess: false}));
        },6000);
      
    })





  }
  render() {
  
    const { handleSubmit} = this.props;
    return (
      <div className="login-container register">
        <div className="login">
          <div className="login-logo">
              <img src={logologin} />
          </div>
          <form onSubmit={handleSubmit(this.submit)}>
            <CompanyRegister />
            <div className="btn-parent-full">
              <Button disabled={!this.props.anyTouched||this.props.invalid} variant="contained" color='primary' type='submit' label="Register">Register</Button>
            </div>
            <div className="sp"><span>Already have an account?</span><Link to='/'>Sign In</Link> or Join as <Link to= '/customerRegister'>Customer</Link>
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

export default connect(mapStateToProps)((CompanyRegistration))

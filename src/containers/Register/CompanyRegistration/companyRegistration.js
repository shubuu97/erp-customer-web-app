import React, { PureComponent } from 'react';
import CompanyRegister from '../../../components/Register/CompanyRegistration/companyRegistration.js';
import {postCustomerRegisterData} from '../../../action/registerActions'
import {connect} from 'react-redux';
import {reduxForm} from 'redux-form';
import RaisedButton from 'material-ui/RaisedButton';
import withLoader from '../../../components/LoaderHoc';
import asyncValidate from './validate.js';
import withMessage from '../../../components/messageHoc/index'
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


    this.props.dispatch(postCustomerRegisterData(postData, 'companyRegister', `${process.env.APPLICATION_BFF_URL}/businesscustomer/register`))





  }
  render() {
  
    const { handleSubmit } = this.props;
    return (
      <div>
        <form onSubmit={handleSubmit(this.submit)}>
          <CompanyRegister />
          <RaisedButton primary={true} type='submit' label="Register" />
        </form>
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
  console.log(state,"fff")
  let message = state.registerReducer.lookUpData.message;
  return {
    isLoading,
    registerReducer,
    message
  }
}

export default connect(mapStateToProps)(withMessage(withLoader(CompanyRegistration)))

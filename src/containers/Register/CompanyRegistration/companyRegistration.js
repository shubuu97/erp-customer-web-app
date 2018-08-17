import React, { PureComponent } from 'react';
import CompanyRegister from '../../../components/Register/CompanyRegistration/companyRegistration.js';
import {postCustomerRegisterData} from '../../../action/registerActions'
import {connect} from 'react-redux';
import {reduxForm} from 'redux-form';
import RaisedButton from 'material-ui/RaisedButton';
import withLoader from '../../../components/LoaderHoc.js';
import asyncValidate from './validate.js'

class CompanyRegistration extends PureComponent {
  submit = (formData) => {
    console.log(formData)
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
    console.log(this.props, "props");
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
  asyncValidate
}
)(CompanyRegistration)

const mapStateToProps = (state) =>
{
  console.log(state,"register state");
  let isLoading = state.registerReducer.isFetching;
  let registerReducer = state.registerReducer;
  
  return {
    isLoading,
    registerReducer,
    
  }
}

export default connect(mapStateToProps)(withLoader(CompanyRegistration))

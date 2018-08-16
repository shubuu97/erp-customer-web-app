import React, { PureComponent } from 'react';
import CompanyRegister from '../../../components/Register/CompanyRegistration/companyRegistration.js';
import {postCustomerRegisterData} from '../../../action/registerActions'
import {connect} from 'react-redux';
import {reduxForm} from 'redux-form';
import RaisedButton from 'material-ui/RaisedButton'

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
  { form: 'CompanyRegistration' }
)(CompanyRegistration)

const mapStateToProps = (state) =>
{
  return {}
}

export default connect(mapStateToProps)(CompanyRegistration)

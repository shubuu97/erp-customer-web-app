import React,{PureComponent} from 'react';
import CustomerRegister from '../../../components/Register/CustomerRegistration/customerRegistration.js';
import {connect} from 'react-redux';
import {reduxForm} from 'redux-form';
import {postCustomerRegisterData} from '../../../action/registerActions';
import logologin from '../../../assets/images/logo-main.png';
import asyncValidate from './validate.js'

import Button from '@material-ui/core/Button'

class CustomerRegistration extends PureComponent
{
  submit=(formData)=>
  {
    console.log(formData)
   let postData = {};
   postData.basicInfo = {};
   postData.basicInfo.firstName = formData.firstName;
   postData.basicInfo.lastName = formData.lastName;
   postData.basicInfo.middleName = formData.middleName;
   postData.basicInfo.email = formData.email;
   postData.basicInfo.contactNumber ='7424926949';
   postData.basicInfo.addressInfo = [];
   let pushObj = {}
   pushObj.address= formData.address;
   pushObj.city = formData.city;
   pushObj.country = formData.country;
   pushObj.state = formData.state;
   pushObj.zipCode = formData.zipCode;
   postData.basicInfo.addressInfo.push(pushObj);
 
   this.props.dispatch(postCustomerRegisterData(postData,'customerRegistr','http://13.127.202.129:2005/customer-bff/customer/register'))
  


   
   
  }
 render()
 {
   console.log(this.props,"props");
   const {handleSubmit} = this.props;
   return(
    <div className="login-container register">
      <div className="login">
        <div className="login-logo">
          <img src={logologin} />
        </div>
         <form onSubmit={handleSubmit(this.submit)}>
           <CustomerRegister />
           <div className="btn-parent-full">
              <Button variant="contained" color='primary' type='submit'>Register</Button>
           </div>
           </form>
        </div>
    </div>
   )
 }   
}


CustomerRegistration = reduxForm(
 {form:'CustomerRegistration',
 asyncValidate}
)(CustomerRegistration);

const mapStateToProps = (state) =>
{
  return {}
}

export default connect(mapStateToProps)(CustomerRegistration)
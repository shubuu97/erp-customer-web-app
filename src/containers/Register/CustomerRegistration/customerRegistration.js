import React,{Component} from 'react';
import CustomerRegister from '../../../components/Register/CustomerRegistration/customerRegistration.js';
import {connect} from 'react-redux';
import {reduxForm} from 'redux-form';
import {postCustomerRegisterData} from '../../../action/registerActions';
import logologin from '../../../assets/images/logo-main.png';
import asyncValidate from './validate.js'
import {showMessage} from '../../../action/common';

import Button from '@material-ui/core/Button'

class CustomerRegistration extends Component
{
  submit=(formData)=>
  {
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
 
   this.props.dispatch(postCustomerRegisterData(postData,'customerRegistr','http://13.127.202.129:2005/customer-bff/customer/register')).then((data)=>{
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
 render()
 {
   const {handleSubmit} = this.props;
   return(
    <div className="login-container register">
      <div className="login">
        <div className="login-logo">
          <img src={logologin} />
        </div>
         <form onSubmit={handleSubmit(this.submit)}>
           <CustomerRegister {...this.props} />
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
 {
  form:'CustomerRegistration',
 enableReinitialize:true,
 keepDirtyOnReinitialize:true
}
)(CustomerRegistration);

const mapStateToProps = (state) =>
{
  let initialValues = {country:'india',state:'india'}
 let {country,state:stateobj,city}  = state.zipCodeData.lookUpData;
 initialValues.country = country;
 initialValues.state = stateobj;
 initialValues.city = city;
 return {initialValues:initialValues}
}

export default connect(mapStateToProps)(CustomerRegistration)
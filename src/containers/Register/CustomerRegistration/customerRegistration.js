import React,{PureComponent} from 'react';
import CustomerRegister from '../../../components/Register/CustomerRegistration/customerRegistration.js';
import {connect} from 'react-redux';
import {reduxForm} from 'redux-form';
import {postCustomerRegisterData} from '../../../action/registerActions';


import RaisedButton from 'material-ui/RaisedButton';

class CustomerRegistration extends PureComponent
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
 
   this.props.dispatch(postCustomerRegisterData(postData,'customerRegistr','http://13.127.202.129:2005/customer-bff/customer/register'))
  


   
   
  }
 render()
 {
   const {handleSubmit} = this.props;
   console.log(this.props,"ff")
   return(
       <div>
         <form onSubmit={handleSubmit(this.submit)}>
           <CustomerRegister />
           <RaisedButton primary={true} type='submit' label="Register"/>
           </form>
        </div>
   )
 }   
}


CustomerRegistration = reduxForm(
 {form:'CustomerRegistration'}
)(CustomerRegistration);

const mapStateToProps = (state) =>
{
  return {}
}

export default connect(mapStateToProps)(CustomerRegistration)
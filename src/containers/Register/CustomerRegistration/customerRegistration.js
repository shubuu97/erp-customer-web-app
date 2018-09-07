import React,{Component} from 'react';
import CustomerRegister from '../../../components/Register/CustomerRegistration/customerRegistration.js';
import {connect} from 'react-redux';
import {reduxForm} from 'redux-form';
import {postCustomerRegisterData} from '../../../action/registerActions';
import logologin from '../../../assets/images/logo-main.png';
import asyncValidate from './validate.js'
import {showMessage} from '../../../action/common';
import {APPLICATION_BFF_URL} from '../../../constants/urlConstants';
import expand from 'keypather/expand';
import {Link} from 'react-router-dom';
import Snackbar from '@material-ui/core/Snackbar';
import { withStyles, withTheme } from '@material-ui/core/styles';



import Button from '@material-ui/core/Button';

const styles = theme => ({
  button: {
    fontSize: '1.4rem',
    color: '#FFF',
  },
  buttonLogin: {
    fontSize: '1.4rem',
    color: '#FFF',
  },
  failure: {
    background: 'red',
    fontSize: '1.4rem'
},
success: {
  background: 'green',
  fontSize: '1.4rem'
}
});


class CustomerRegistration extends Component
{
  
    constructor(props) {
      super(props);
      this.state = {
        message: '',
        isSuccess: false
      }
    }
  handleSubmit=(formData)=>
  {
   let postData = {};
   postData.basicInfo = {};
   postData.basicInfo.firstName = formData.firstName;
   postData.basicInfo.lastName = formData.lastName;
   postData.basicInfo.middleName = formData.middleName;
   postData.basicInfo.email = formData.email;
   postData.basicInfo.contactNumber ='9876543210';
   postData.basicInfo.addressInfo = [];
   let pushObj = {}
   pushObj.address= formData.address;
   pushObj.city = formData.city;
   pushObj.country = formData.country;
   pushObj.state = formData.state;
   pushObj.zipCode = formData.zipCode;
   postData.basicInfo.addressInfo.push(pushObj);
   
   this.props.dispatch(postCustomerRegisterData(postData,'customerRegistr',`${APPLICATION_BFF_URL}/customer/register`)).then((data)=>{
{
      this.props.dispatch(showMessage({text: "Successful Operation", isSuccess: true}));
      this.props.history.push('/register');
      setTimeout(()=>{
        this.props.dispatch(showMessage({text: "", isSuccess: true}));
      },6000);
    }
  }, (err)=>{
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
 render()
 {
   const {handleSubmit,classes, theme} = this.props;

   return(
    <div className="login-container register">
      <div className="login">
        <div className="login-logo">
          <img src={logologin} />
        </div>
         <form onSubmit={handleSubmit(this.handleSubmit)}>
           <CustomerRegister {...this.props} />
           <div className="btn-parent-full">
              <Button variant="contained" color='primary' type='submit' disabled={!this.props.anyTouched||this.props.invalid}>Register</Button>
              <div className="sp"><span>Already have an account?</span><Link to='/'>Sign In</Link> or Join as <Link to= '/companyRegister'>Company</Link>
              </div>
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


CustomerRegistration = reduxForm(
 {
  form:'CustomerRegistration',
 enableReinitialize:true,
 keepDirtyOnReinitialize:true,
 asyncValidate
}
)(CustomerRegistration);

const mapStateToProps = (state) =>
{
  
  let initialValues = {}

  if(state.zipCodeData && state.zipCodeData.meta)
  {
   let meta = state.zipCodeData.meta;
   if(meta.form=="CustomerRegistration")
   {
    let fieldValue = meta.field.split('.')[0];
    if(fieldValue != 'zipCode') {
      let {country,state:stateobj,city}  = state.zipCodeData.lookUpData;
      let expandObj = {};
      expandObj[`${fieldValue}.country`] = country;
      expandObj[`${fieldValue}.state`] = stateobj;
      expandObj[`${fieldValue}.city`] = city;

    } else {
      let {country,state:stateobj,city}  = state.zipCodeData.lookUpData;
      initialValues.country = country;
      initialValues.state = stateobj;
      initialValues.city = city;
    }
   }
  }
 return {initialValues:initialValues}
}

export default connect(mapStateToProps)(withStyles(styles)(CustomerRegistration))
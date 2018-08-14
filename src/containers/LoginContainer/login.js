import React,{PureComponent} from 'react';
import LoginView from '../../components/Login/Login';
import {reduxForm,Field} from 'redux-form';
import RaiseButton from 'material-ui/RaisedButton';
import MenuItem from 'material-ui/MenuItem'
import {SelectFieldInput} from '../../components/common/MaterialUiComponents';
import SignUpButton from '../../components/SignUpButton';
class Login extends PureComponent
{
 render()
 {
   return(
       <div>
           <LoginView/>
           <RaiseButton primary={true} label="Sign In"/>
           <div>
           <SignUpButton/>
           </div>

        </div>
   )
 }   
}


export default reduxForm(
 {
   form:'LoginForm',
  
  }
)(Login)

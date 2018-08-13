import React,{PureComponent} from 'react';
import LoginView from '../../components/Login/Login';
import {reduxForm} from 'redux-form'
class Login extends PureComponent
{
 render()
 {
   return(
       <div>
           <LoginView/>
        </div>
   )
 }   
}


export default reduxForm(
 {form:'LoginForm'}
)(Login)

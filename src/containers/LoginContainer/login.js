import React,{PureComponent} from 'react';
import LoginView from '../../components/Login/Login';
import {reduxForm,Field} from 'redux-form';
import RaiseButton from 'material-ui/RaisedButton';
//import {SaveButtonV1} from '../../components/common/SaveButton'
import MenuItem from 'material-ui/MenuItem'
import {SelectFieldInput} from '../../components/common/MaterialUiComponents';
import SignUpButton from '../../components/SignUpButton';
import {postLogin} from '../../action/loginAction';
import logologin from '../../assets/images/logo-main.png';
import {connect} from 'react-redux'
class Login extends PureComponent
{
  loginSubmitHandler=(values)=>
  {
    console.log(this.props,"props fff")

  console.log(values,"aa")
   this.props.dispatch(postLogin(values,'',`${process.env.APPLICATION_BFF_URL}/iam/user/login`));

  }
 render()
 {
 
  const {handleSubmit} = this.props
   return(
       <div className="login-container">
       <div className="login">
          <div className="login-logo">
              <img src={logologin} />
          </div>
         <form onSubmit={handleSubmit(this.loginSubmitHandler)}>
           <LoginView/>
           <div className="btn-parent">
              <RaiseButton  type={'submit'} primary={true} label="Sign In"/>
           </div>
           <div className="btn-parent">
              <RaiseButton  type={'submit'} label="Sign Up"/>
           </div>
      </form>
    </div>
        </div>
   )
 }   
}


Login = reduxForm(
 {
   form:'LoginForm',
  
  }
)(Login)

function mapStateToProps(state)
{
  return {}
}

export default connect(mapStateToProps)(Login)


import React,{Component} from 'react';
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
class Login extends Component
{
  loginSubmitHandler=(values)=>
  {
    console.log(this.props,"props fff")

  console.log(values,"aa")
   this.props.dispatch(postLogin(values,'',`${process.env.APPLICATION_BFF_URL}/iam/user/login`));

  }
  componentDidUpdate(prevProps)
    {
    if(this.props.lookUpData&& this.props.lookUpData.data&&this.props.lookUpData.data.authToken)

    {
    this.props.history.push('/customerProfile')
    }
    }
 render()
 {
 console.log("rener runs")
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
          
              
           
      </form>
      
        <div> 
      <RaiseButton  type={'submit'} label="Sign Up For Customer" onClick={()=>{this.props.history.push('/customerRegister')}}/>
      <RaiseButton  type={'submit'} label="Sign Up For Company" onClick={()=>{this.props.history.push('/companyRegister')}}/>
          </div>
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
  let isLoading = state.loginReducer.isFetching
  let loginData = state.loginReducer;
  let lookUpData = state.loginReducer.lookUpData
  return {isLoading,loginData,lookUpData}
}

export default connect(mapStateToProps)(
  (Login))


import React,{Component} from 'react';
import LoginView from '../../components/Login/Login';
import {reduxForm,Field} from 'redux-form';
import RaiseButton from 'material-ui/RaisedButton';
import MenuItem from 'material-ui/MenuItem'
import {SelectFieldInput} from '../../components/common/MaterialUiComponents';
import SignUpButton from '../../components/SignUpButton';
import {postLogin} from '../../action/loginAction';
import {connect} from 'react-redux';
import withLoader from '../../components/LoaderHoc'
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
    this.props.history.push('/companyProfile')
    }
    }
 render()
 {
 console.log("rener runs")
  const {handleSubmit} = this.props
   return(
       <div>
         <form onSubmit={handleSubmit(this.loginSubmitHandler)}>
           <LoginView/>
           <RaiseButton type={'submit'} primary={true} label="Sign In"/>
           <div>
           <SignUpButton/>
           </div>
    </form>
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


import React,{Component} from 'react';
import LoginView from '../../components/Login/Login';
import {reduxForm,Field} from 'redux-form';
import RaiseButton from 'material-ui/RaisedButton';
import Button from '@material-ui/core/Button';
import { withStyles,withTheme } from '@material-ui/core/styles';
//import {SaveButtonV1} from '../../components/common/SaveButton'
import MenuItem from 'material-ui/MenuItem'
import {SelectFieldInput} from '../../components/common/MaterialUiComponents';
import SignUpButton from '../../components/SignUpButton';
import {postLogin} from '../../action/loginAction';
import logologin from '../../assets/images/logo-main.png';
import companyIcon from '../../assets/images/company-icon.png';
import customerIcon from '../../assets/images/customer-icon.png';
import {connect} from 'react-redux';
import {APPLICATION_BFF_URL} from '../../constants/urlConstants'


const styles = theme => ({
  button: {
    fontSize:'1.4rem',
    color:'#FFF',
  },
  buttonLogin:{
    fontSize:'1.4rem',
    color: '#FFF',
  }
});

class Login extends Component
{
  loginSubmitHandler=(values)=>
  {
    console.log(this.props,"props fff")

  console.log(values,"aa")
   this.props.dispatch(postLogin(values,'',`${APPLICATION_BFF_URL}/iam/user/login`));

  }
  componentDidUpdate(prevProps)
    {
    if(this.props.lookUpData&& this.props.lookUpData.data&&this.props.lookUpData.data.authToken)

    {
       localStorage.setItem('authToken',this.props.lookUpData.data.authToken)
    if(this.props.lookUpData.data.menu.length==0)
    {
      localStorage.setItem('id','5b7530f8a3b7320018ee14b7')

    this.props.history.push('/customerProfile')

    }
    else
    {
      localStorage.setItem('id','5b7514dfab851a001b83452a')

      this.props.history.push('/companyProfile')
    }
    }
    }
 render()
 {
   const {classes,theme} = this.props;

 console.log("props of this page",this.props)
  const {handleSubmit} = this.props
   return(
      <div className="login-container">
        <div className="login">
          <div className="login-logo">
              <img src={logologin} />
          </div>
          <form onSubmit={handleSubmit(this.loginSubmitHandler)}>
            <LoginView/>
            <div className="btn-parent-full">
                <Button className={classes.buttonLogin} type={'submit'} variant="contained" color='primary'>Sign In</Button>
            </div>
          </form>      
          <div className="login-btn"> 
              <Button className={classes.button} type={'submit'} onClick={()=>{this.props.history.push('/companyRegister')}}><img src={companyIcon} />Company Sign Up</Button>
              <Button className={classes.button}  type={'submit'} onClick={()=>{this.props.history.push('/customerRegister')}}><img src={customerIcon} />Customer Sign Up</Button>
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

export default connect(mapStateToProps)(withTheme()(withStyles(styles)(Login)))

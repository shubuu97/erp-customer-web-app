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
import {APPLICATION_BFF_URL} from '../../constants/urlConstants';
import {postBasicInfoData} from '../../action/basicInfoActions';
import routeDeciderHoc from '../../components/Login/routerDecider';
import {showMessage} from '../../action/common';




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
 
  componentWillMount()
  {
    localStorage.removeItem('authToken')
    localStorage.removeItem('id')
  }
  loginSubmitHandler=  (values)=>
  {
    // var temp = postLogin(values,'',`${APPLICATION_BFF_URL}/iam/user/login`);
    // console.log("temp test", temp);
   var temp2 = this.props.dispatch(postLogin(values,'',`${APPLICATION_BFF_URL}/iam/user/login`)).then((data)=>{
    console.log(data,"data is here")
    let menulength = data.data.menu.length;
     localStorage.setItem('authToken',data.data.authToken);
      this.props.dispatch(postBasicInfoData({email: values.email},'',`${APPLICATION_BFF_URL}/user/logindata`))
      .then((data)=>
      {
        localStorage.setItem('id',data.data.content._id)
        if(data.message) {
          this.props.dispatch(showMessage(data.message));
          setTimeout(()=>{
            this.props.dispatch(showMessage(''));
          },6000);
        }
        //  if(menulength>0)
        //  this.props.history.push('/companyProfile')
        //  else
        //  this.props.history.push('/customerProfile')
 
      })
     
     
   }, (err)=>{
    console.log(err);
    if(err.message) {
      this.props.dispatch(showMessage(err.message));
      setTimeout(()=>{
        this.props.dispatch(showMessage(''));
      },6000);
    }
   })
  }
  // componentDidUpdate(prevProps)
  //   {
  //   if(this.props.lookUpData&& this.props.lookUpData.data&&this.props.lookUpData.data.authToken)

  //   {
  //     localStorage.setItem('authToken',this.props.lookUpData.data.authToken)
  //      //localStorage.setItem('authToken','eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI1YWNmNzI1NjI5MjNiMTAwMTAyOWZlZDYiLCJ1c2VyTmFtZSI6IkFPQjY3Njc2NyIsImNvbXBhbnlJZHMiOlsiNWFkODY5ZjA0NzI4ODUwMDExZDc1OTc4Il0sInVzZXJDb21wYW55SWQiOiI1YWQ4NjlmMDQ3Mjg4NTAwMTFkNzU5NzgiLCJyb2xlSWQiOlt7Il9pZCI6IjVhZmFkNmQ2ZDZiMjYxMDAxMTcxNjM2NCIsIm5hbWUiOiJDb21wYW55IFN1cGVyIEFkbWluIn0seyJfaWQiOiI1YjFmNjFmNDZlNjVmMDAwMTEwMDQwNjgiLCJuYW1lIjoiUE9fQXBwcm92ZXIifSx7Il9pZCI6IjViMjM5YWNlZmZjNDA2MDAxMmNhNDM3ZiIsIm5hbWUiOiJTdXBwbGllcl9BcHByb3ZlciJ9LHsiX2lkIjoiNWIyMzljMTRmZmM0MDYwMDEyY2E0MzgyIiwibmFtZSI6Ikludm9pY2VfQXBwcm92ZXIifV0sImlhdCI6MTUzMjc2NDc2OSwiZXhwIjoxNTM1MzU2NzY5fQ.AZOqHqutY8zb322AP1XQxrWsbIeCY3F0RgC7sqffbrLBzCYSxzWUHEUjT0_Lmg_bdQSnOJgagIt9lMEGz-nW0Uuq0rTfk4Pg7mglG2wXG3KNQpC40dpJ7naMwFUL5GgDUSigjQevoQPQ5Lix1LfxvHUES_6t4oC5-_yv5uNeGNk'  )
  //   if(this.props.lookUpData.data.menu.length==0)
  //   {
  //     localStorage.setItem('id','5b76c238b7c25800173c5908')

  //   this.props.history.push('/customerProfile')

  //   }
  //   else
  //   {
  //     localStorage.setItem('id','5b76c2adb7c25800173c590a')

  //     this.props.history.push('/companyProfile')
  //   }
  //   }
  //   }
 render()
 {
   const {classes,theme} = this.props;

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
  let lookUpData = state.loginReducer.lookUpData;
  let customerStatus  = state.basicInfodata&& state.basicInfodata.customerStatus
  let role = state.basicInfodata.role;
  let id  = state.basicInfodata.id;

  return {isLoading,loginData,lookUpData,customerStatus,role,id}
}

export default connect(mapStateToProps)(withTheme()(withStyles(styles)(routeDeciderHoc(Login))))

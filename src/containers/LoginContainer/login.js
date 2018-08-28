import React, { Component } from 'react';
import LoginView from '../../components/Login/Login';
import { reduxForm, Field } from 'redux-form';
import RaiseButton from 'material-ui/RaisedButton';
import Button from '@material-ui/core/Button';
import { withStyles, withTheme } from '@material-ui/core/styles';
//import {SaveButtonV1} from '../../components/common/SaveButton'
import MenuItem from 'material-ui/MenuItem'
import { SelectFieldInput } from '../../components/common/MaterialUiComponents';
import SignUpButton from '../../components/SignUpButton';
import { postLogin } from '../../action/loginAction';
import logologin from '../../assets/images/logo-main.png';
import companyIcon from '../../assets/images/company-icon.png';
import customerIcon from '../../assets/images/customer-icon.png';
import { connect } from 'react-redux';
import { APPLICATION_BFF_URL } from '../../constants/urlConstants';
import { postBasicInfoData } from '../../action/basicInfoActions';
import { postRegisterTokenData } from '../../action/registerSignUpToken';
import routeDeciderHoc from '../../components/Login/routerDecider';
import { showMessage } from '../../action/common';
import Snackbar from '@material-ui/core/Snackbar';




const styles = theme => ({
  button: {
    fontSize: '1.4rem',
    color: '#FFF',
  },
  buttonLogin: {
    fontSize: '1.4rem',
    color: '#FFF',
  }
});

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      message: ''
    }
  }

  componentWillMount() {
    localStorage.removeItem('authToken')
    localStorage.removeItem('id')
  }
  loginSubmitHandler = (values) => {
    var temp2 = this.props.dispatch(postLogin(values, '', `${APPLICATION_BFF_URL}/iam/user/login`)).then((data) => {
      console.log(data, "data is here")
      let menulength = data.data.menu.length;
      localStorage.setItem('authToken', data.data.authToken);
      this.props.dispatch(postBasicInfoData({ email: values.email }, '', `${APPLICATION_BFF_URL}/user/logindata`))
        .then((data) => {
          localStorage.setItem('id', data.data.content._id)
          if (data.message) {
            this.setState({ message: data.message });
            setTimeout(() => {
              this.setState({ message: '' });
            }, 6000);
          }
        })
    }, (err) => {
      console.log(err);
      if (err.message) {
        this.setState({ message: err.message });
        setTimeout(() => {
          this.setState({ message: '' });
        }, 6000);
      }
    })
  }

  getSignUpToken(type) {
    var temp2 = this.props.dispatch(postRegisterTokenData({ roleName: type }, '', `${APPLICATION_BFF_URL}/iam/signup/token`)).then((data) => {
      localStorage.setItem('authToken', data.data.authToken);
      if (type === 'customer') {
        this.props.history.push('/customerRegister')
      } else {
        this.props.history.push('/companyRegister');
      }
    }, (err) => {
      console.log(err);
    });
  }
  handleOpen = () => {
    return true;
  };
  render() {
    const { classes, theme } = this.props;

    const { handleSubmit } = this.props
    return (
      <div className="login-container">
        <div className="login">
          <div className="login-logo">
            <img src={logologin} />
          </div>
          <form onSubmit={handleSubmit(this.loginSubmitHandler)}>
            <LoginView />
            <div className="btn-parent-full">
              <Button className={classes.buttonLogin} type={'submit'} variant="contained" color='primary'>Sign In</Button>
            </div>
          </form>
          <div className="login-btn">
            <Button className={classes.button} type={'submit'} onClick={() => { this.getSignUpToken('Business Customer') }}><img src={companyIcon} />Company Sign Up</Button>
            <Button className={classes.button} type={'submit'} onClick={() => { this.getSignUpToken('Customer') }}><img src={customerIcon} />Customer Sign Up</Button>
          </div>
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
            }}
            message={<span id="message-id">{this.state.message}</span>}
          />}
        </div>
      </div>
    )
  }
}


Login = reduxForm(
  {
    form: 'LoginForm',

  }
)(Login)

function mapStateToProps(state) {
  let isLoading = state.loginReducer.isFetching
  let loginData = state.loginReducer;
  let lookUpData = state.loginReducer.lookUpData;
  let customerStatus = state.basicInfodata && state.basicInfodata.customerStatus
  let role = state.basicInfodata.role;
  let id = state.basicInfodata.id;

  return { isLoading, loginData, lookUpData, customerStatus, role, id }
}

export default connect(mapStateToProps)(withTheme()(withStyles(styles)(routeDeciderHoc(Login))))

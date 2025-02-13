import React, { Component } from 'react';
import LoginView from '../../components/Login/Login';
import { reduxForm, Field } from 'redux-form';
import RaiseButton from 'material-ui/RaisedButton';
import Button from '@material-ui/core/Button';
import { withStyles, withTheme } from '@material-ui/core/styles';
//import {SaveButtonV1} from '../../components/common/SaveButton'
import { postLogin } from '../../action/loginAction';
import logologin from '../../assets/images/logo-main.png';
import companyIcon from '../../assets/images/company-icon.png';
import customerIcon from '../../assets/images/customer-icon.png';
import { connect } from 'react-redux';
import { APPLICATION_BFF_URL } from '../../constants/urlConstants';
import { postBasicInfoData } from '../../action/basicInfoActions';
import { postRegisterTokenData } from '../../action/registerSignUpToken';
import routeDeciderHoc from '../../components/Login/routerDecider';

import Snackbar from '@material-ui/core/Snackbar';
import asyncValidate from './validate.js';
import { fetchCategory, selectedCategory } from '../../action/category';
import { fetchCategoryTypeAndItems } from '../../action/categoryTypeAndItems';
import { fetchProfileFormData } from '../../action/profileFormData';
import { Link } from 'react-router-dom';
import { setSelectedCategoryType, applyFilter } from '../../containers/Products/action/product';
import { get } from 'lodash';
import CircularProgress from '@material-ui/core/CircularProgress';


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

const priceFilterObject = {
  lessThan50: false,
  from50To100: false,
  from100To200: false,
  above200: false
}

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      message: '',
      isSuccess: false
    }
  }

  componentWillMount() {
    localStorage.removeItem('authToken')
    localStorage.removeItem('id')
  }
  loginSubmitHandler = (values) => {
    var temp2 = this.props.dispatch(postLogin(values, '', `${APPLICATION_BFF_URL}/iam/user/login`)).then((data) => {
      let menulength = data.data.menu.length;
      localStorage.setItem('authToken', data.data.authToken);
      localStorage.setItem('email', data.data.email)
      localStorage.setItem('userLoginId', data.data.id)

      this.props.dispatch(postBasicInfoData({ email: values.email }, '', `${APPLICATION_BFF_URL}/user/logindata`))
        .then((data) => {
          if (data.data.content.customerStatus) {
            this.props.dispatch(fetchProfileFormData(`${APPLICATION_BFF_URL}/customer/register`));
          } else {
            this.props.dispatch(fetchProfileFormData(`${APPLICATION_BFF_URL}/businesscustomer/register`));
          }
          // Fetch Category Data
          this.props.dispatch(fetchCategory(`${APPLICATION_BFF_URL}/inventory/itemcategories`, { isActive: 1 })).then((data) => {
            console.log("Category list is ", data);
            this.props.dispatch(selectedCategory(data.data.itemCategories[0]));
            this.props.dispatch(fetchCategoryTypeAndItems(`${APPLICATION_BFF_URL}/inventory/items/bycategory`, { categoryId: data.data.itemCategories[0].categoryId.toString() })).then((typeData) => {
              this.props.dispatch(setSelectedCategoryType(get(typeData, 'data.itemTypes[0]', null)));
              this.props.dispatch(applyFilter(get(typeData, 'data.itemTypes[0].products', []), priceFilterObject));
            }, (err) => {
              console.log(err);
            });
            console.log("Product Data", data);
          }, (err) => {
            console.log(err);
          });
          localStorage.setItem('id', data.data.content._id)
          this.setState({ message: "Successfully Saved", isSuccess: true });
          setTimeout(() => {
            this.setState({ message: '' });
          }, 6000);
        })
    }, (err) => {
      if (err.message) {
        this.setState({ message: err.message, isSuccess: false });
        setTimeout(() => {
          this.setState({ message: '' });
        }, 6000);
      }
    })
  }

  getSignUpToken(type) {
    var temp2 = this.props.dispatch(postRegisterTokenData({ roleName: type }, '', `${APPLICATION_BFF_URL}/iam/signup/token`)).then((data) => {
      localStorage.setItem('authToken', data.data.authToken);
      if (type === 'Customer') {
        this.props.history.push('/customerRegister');
      } else {
        this.props.history.push('/companyRegister');
      }
    }, (err) => {
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
              <Button className={classes.buttonLogin} type='submit' variant="contained" color='primary' disabled={this.props.isFetching}>{this.props.isFetching?<CircularProgress size={24}/>:'Sign In'}</Button>
            </div>
          </form>
          <div className="login-btn">
            <Button className={classes.button} type={'submit'} onClick={() => { this.getSignUpToken('Business Customer') }}><img src={companyIcon} />Company Sign Up</Button>
            <Button className={classes.button} type={'submit'} onClick={() => { this.getSignUpToken('Customer') }}><img src={customerIcon} />Individual Sign Up</Button>
          </div>
          <div className="sp">
            <Link style={{textDecoration: 'underline'}} to='/forgot'>Forgot password<br /></Link>
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


Login = reduxForm(
  {
    form: 'LoginForm',
    asyncValidate
  }
)(Login)

function mapStateToProps(state) {

  let isFetchingLogin = state.loginReducer.isFetching
  let loginData = state.loginReducer;
  let lookUpData = state.loginReducer.lookUpData;
  let isFetchingCustomerStatus = get(state,'basicInfodata.isFetching','');
  let customerStatus = state.basicInfodata && state.basicInfodata.customerStatus
  let role = state.basicInfodata && state.basicInfodata.role;
  let id = state.basicInfodata && state.basicInfodata.id;
  let isFetching = isFetchingLogin||isFetchingCustomerStatus

  return { isFetching,loginData, lookUpData, customerStatus, role, id }
}

export default connect(mapStateToProps)(withTheme()(withStyles(styles)(routeDeciderHoc(Login))))

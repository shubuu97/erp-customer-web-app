import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import {Provider} from 'react-redux';
import thunk from 'redux-thunk';
import {HashRouter,Route,Switch,Link} from 'react-router-dom';
import {createLogger} from 'redux-logger';
import {createStore,applyMiddleware,compose} from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import hardSet from 'redux-persist/lib/stateReconciler/hardSet';
import { PersistGate } from 'redux-persist/integration/react';
import fetchMiddleware from './middlewares/axiosMiddleWare';
import reducer from './reducers';
import Login from '../src/containers/LoginContainer/login';
import CompanyRegister from '../src/containers/Register/CompanyRegistration/companyRegistration';
import CustomerRegister from '../src/containers/Register/CustomerRegistration/customerRegistration';
import BasicInfoForm from './containers/BasicInfo/basicInfoForm';
//import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AccountInfo from './containers/CompanyProfile/AccountInfo';
import LicenceInfo from './containers/CompanyProfile/LicenceInfo';
import SiteInfo from './containers/CompanyProfile/SiteInfo'
import CustomerInfo from './containers/CustomerProfile/AccountInfo';
import CompanyBankingInfo from './containers/CompanyProfile/BankingInfo';
import CustomerBankingInfo from './containers/CustomerProfile/BankingInfo';
import CompanyProfile from './containers/CompanyProfile/CompanyProfileTab';
import CustomerProfile from './containers/CustomerProfile/CustomerProfileTab';
import productList from './containers/Products/ProductList';
import productDetails from './containers/Products/ProductDetails';
import Cart from './containers/Products/Cart';
import './assets/stylesheets/main.css';
import { createMuiTheme,MuiThemeProvider } from '@material-ui/core/styles';
import MainLayout from './MainLayout/mainLayout'
import purple from '@material-ui/core/colors/purple';
import CheckOut from './containers/Products/CheckOut/index';
import SignUp from './containers/Register/SignUpTabs'
import AfterRegister from './containers/AfterRegistration/afterRegistration';
import AfterApproval from './containers/AfterApproval/afterApproval';
import AfterCheckout from './containers/AfterCheckout/afterCheckout';
import MiniCheckout from './containers/Products/Cart/MiniCart';
import Orders from './containers/Orders/OrderList';
import TrackOrder from './containers/Orders/TrackOrder';
import ResetPassword from './containers/Passwords/ResetPassword/resetPassword';
import ForgotPassword from './containers/Passwords/forgotPassword/forgotPassword';
import SetPassword from './containers/Passwords/SetPassword/setPassword';
import StaticProfileView from './containers/CustomerProfile/ProfileStaticView/profileView'
import PaymentStatus from './containers/Orders/OrderList/paymentStatus';
import CompanyStaticProfileView from './containers/CompanyProfile/ProfileStaticView/profileView'
import Notification from './containers/Notifications';
import AddressBook from './containers/AddressBook';
import MyOffers from './containers/MyOffers'
import AfterRejected from './containers/AfterRejected/afterRejected';

const theme = createMuiTheme({
  
  palette: {
    primary: {
      main: '#0e8c4d',
    },
    secondary: {
      main: '#585858',
    },
    default:{
      main:'#dc0909'
    }
  },
});

if (module.hot) {
  module.hot.accept();
}



const middleware = [thunk, fetchMiddleware];
if (process.env.NODE_ENV !== 'production') {
    middleware.push(createLogger());
  }
  const persistConfig = {
    key: 'customerroot',
    storage,
    stateReconciler: hardSet,
    blacklist: ['commonData', 'zipCodeData','form']
  };
 const persistedReducer = persistReducer(persistConfig, reducer);

 const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

  export const store = createStore(
    // reducer,
    persistedReducer,composeEnhancers(applyMiddleware(...middleware))
  );
  export const persistor = persistStore(store);

const RouterWithMainLayout=({ layout, component, ...rest })=> {
  return (
    <Route {...rest} render={props =>
      React.createElement(layout, props, React.createElement(component, props))
    } />
  );
}

ReactDOM.render(
  <MuiThemeProvider theme={theme}>
<Provider store={store}>
<PersistGate loading={null} persistor={persistor}>
<HashRouter>
<Switch>

<Route exact path="/" component={Login}/>
<Route layout={MainLayout} exact path="/companyRegister" component={CompanyRegister}/>
<Route  layout={MainLayout} exact path="/customerRegister" component={CustomerRegister}/>


<Route exact path="/app" component={App} />
<Route exact path ="/basicinfo" component={BasicInfoForm}/>
<Route exact path="/AccountInfo" component={AccountInfo}/>
<Route exact path ="/basicinfo" component={BasicInfoForm}/>
<Route exact path="/LicenceInfo" component={LicenceInfo}/>
<Route exact path="/SiteInfo" component = {SiteInfo}/>
<Route exact path="/CustomerInfo" component={CustomerInfo}/>
<Route exact path="/CompanyBankingInfo" component={CompanyBankingInfo}/>
<Route exact path="/CustomerBankingInfo" component={CustomerBankingInfo}/>
<Route exact path='/approval' component={AfterApproval}/>
<Route exact path='/rejected' component={AfterRejected}/>
<Route exact path='/register' component={AfterRegister}/>
<RouterWithMainLayout layout={MainLayout} exact path='/orderSuccess' component={AfterCheckout}/>

<RouterWithMainLayout layout={MainLayout} exact path="/companyProfile" component = {CompanyProfile}/>
<RouterWithMainLayout layout={MainLayout} path="/customerProfile" component = {CustomerProfile}/>

<RouterWithMainLayout layout={MainLayout} path="/productList" component = {productList}/>
<RouterWithMainLayout layout={MainLayout} path="/productDetail" component = {productDetails}/>
<RouterWithMainLayout layout={MainLayout} path="/cart" component = {Cart} />
<RouterWithMainLayout layout={MainLayout} path="/checkout" component = {CheckOut} />
<RouterWithMainLayout layout={MainLayout} path="/minicart" component = {MiniCheckout}/>
<RouterWithMainLayout layout={MainLayout} path="/orders" component = {Orders}/>
<RouterWithMainLayout layout={MainLayout} path="/track" component = {TrackOrder}/>
<RouterWithMainLayout layout={MainLayout} path="/reset" component = {ResetPassword}/>
<RouterWithMainLayout layout={MainLayout} path="/StaticProfileView" component = {StaticProfileView}/>
<RouterWithMainLayout layout={MainLayout} path="/CompanyStaticProfileView" component = {CompanyStaticProfileView}/>
<RouterWithMainLayout layout={MainLayout} path="/Notifications" component = {Notification}/>
<RouterWithMainLayout layout={MainLayout} path="/AddressBook" component = {AddressBook}/>
<RouterWithMainLayout layout={MainLayout} path="/myOffers" component = {MyOffers}/>


<Route exact path="/forgot" component={ForgotPassword} />
<Route exact path="/confirmation" component={SetPassword} />
<RouterWithMainLayout layout={MainLayout} path="/paymentStatus" component = {PaymentStatus}/>





</Switch>

</HashRouter>
</PersistGate>
</Provider>
</MuiThemeProvider>
, document.getElementById('root'));
registerServiceWorker();

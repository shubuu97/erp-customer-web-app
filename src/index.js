import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import {Provider} from 'react-redux';
import thunk from 'redux-thunk';
import {BrowserRouter,Route,Switch,Link} from 'react-router-dom';
import {createLogger} from 'redux-logger';
import {createStore,applyMiddleware} from 'redux';
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
import AfterRegister from './containers/AfterRegistration/afterRegistration';
import AfterApproval from './containers/AfterApproval/afterApproval';

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
    key: 'root',
    storage,
    stateReconciler: hardSet,
    blacklist: ['bankDetailsData']
  };
 const persistedReducer = persistReducer(persistConfig, reducer);

  export const store = createStore(
    // reducer,
    persistedReducer,
    applyMiddleware(...middleware),
  
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
<BrowserRouter>
<Switch>

<Route exact path="/customer" component={Login}/>
<Route exact path="/companyRegister" component={CompanyRegister}/>
<Route exact path="/customerRegister" component={CustomerRegister}/>

<div className="right-content">
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
<Route exact path='/register' component={AfterRegister}/>

<RouterWithMainLayout layout={MainLayout} exact path="/companyProfile" component = {CompanyProfile}/>
<RouterWithMainLayout layout={MainLayout} path="/customerProfile" component = {CustomerProfile}/>

<Route path="/customer/productList" component = {productList}/>
<Route path="/productDetail" component = {productDetails}/>
<Route path="/cart" component = {Cart} />
</div>
</Switch>

</BrowserRouter>
</PersistGate>
</Provider>
</MuiThemeProvider>
, document.getElementById('root'));
registerServiceWorker();

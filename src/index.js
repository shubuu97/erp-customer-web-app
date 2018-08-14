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
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AccountInfo from './containers/CompanyProfile/AccountInfo';
import LicenceInfo from './components/CompanyProfile/LicenceInfo';
import SiteInfo from './components/CompanyProfile/SiteInfo'
import CustomerInfo from './containers/CustomerProfile/AccountInfo'
import CustomerBankingInfo from './containers/CustomerProfile/BankingInfo'
if (module.hot) {
  module.hot.accept();
}



const middleware = [thunk, fetchMiddleware];
if (process.env.NODE_ENV !== 'production') {
    middleware.push(createLogger());
  }
  // // const persistConfig = {
  // //   key: 'root',
  // //   storage,
  // //   stateReconciler: hardSet,
  // //   blacklist: ['batchReducer.plantsDetails.plants'],
  // };
 // const persistedReducer = persistReducer(persistConfig, reducer);

  export const store = createStore(
    // reducer,
    reducer,
    applyMiddleware(...middleware),
  
  );
  export const persistor = persistStore(store);
console.log(process.env)

ReactDOM.render(
 <MuiThemeProvider>
<Provider store={store}>
<BrowserRouter>
<Switch>
<Route exact path="/app" component={App} />
<Route exact path="/" component={Login}/>
<Route exact path ="/basicinfo" component={BasicInfoForm}/>
<Route exact path="/companyRegister" component={CompanyRegister}/>
<Route exact path="/customerRegister" component={CustomerRegister}/>
<Route exact path="/AccountInfo" component={AccountInfo}/>
<Route exact path="/LicenceInfo" component={LicenceInfo}/>
<Route exact path="/SiteInfo" component = {SiteInfo}/>
<Route exact path="/CustomerInfo" component={CustomerInfo}/>
<Route exact path="/CustomerBankingInfo" component={CustomerBankingInfo}/>

</Switch>
</BrowserRouter>
</Provider>
</MuiThemeProvider>, document.getElementById('root'));
registerServiceWorker();

import React, { Component } from 'react';
import axios from 'axios';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import { TextFieldInput } from '../../../components/common/MaterialUiComponents';
import { Field, reduxForm, FormSection } from 'redux-form';
import orIcon from './../../../assets/images/or-icon.png';
import _find from 'lodash/find';
import asyncValidate from './validate.js';
import CircularProgress from '@material-ui/core/CircularProgress';

function new_script(src) {
  return new Promise(function (resolve, reject) {
    var script = document.createElement('script');
    script.src = src;
    script.addEventListener('load', function () {
      resolve();
    });
    script.addEventListener('error', function (e) {
      reject(e);
    });
    document.body.appendChild(script);
  })
};

class PaymentWithCheck extends Component {
  constructor() {
    super();
    this.state = {
      showBankForm: false,
      isLoading: false
    };
  }

  componentDidMount() {
    new_script("https://jstest.authorize.net/v3/AcceptUI.js");
    new_script("https://jstest.authorize.net/v1/Accept.js").then((data) => {
      console.log("chal gai", data);
      this.setState({})
    })
      .catch((err) => {
        console.log(err)
      })
  }

   responseHandler=(response)=> {
    console.log(response,"error")
    this.setState({isLoading: false});
    if (response.messages.resultCode === "Error") {
      var i = 0;
      while (i < response.messages.message.length) {
        console.log(
          response.messages.message[i].code + ": " +
          response.messages.message[i].text
        );
        i = i + 1;
      }
    } else {
      console.log("Success data", response);
      this.props.onPay(response, 'echeck');
      this.setState({showBankForm: false});
    }
  }

  sendPaymentDataToAnet = () => {
    let bankData = {};
    bankData.accountNumber = this.props.paymenyWithCheckValues.bankData.bankAccountNumber;
    bankData.routingNumber = this.props.paymenyWithCheckValues.bankData.bankRoutingNumber;
    bankData.nameOnAccount = this.props.paymenyWithCheckValues.bankData.accountName;
    bankData.accountType = this.props.paymenyWithCheckValues.bankData.accountType;
    var authData = {};
    authData.clientKey = this.props.detail.clientKey
    authData.apiLoginID = this.props.detail.apiLoginKey;

    // If using banking information instead of card information,
    // build a bankData object instead of a cardData object.
    var secureData = {};
    secureData.authData = authData;

    secureData.bankData = bankData;
    this.setState({isLoading: true});
    window.Accept.dispatchData(secureData, this.responseHandler);

  
  }
  showBankForm() {
    this.setState({ showBankForm: !this.state.showBankForm });
  }
  handleClose = () => {
    this.setState({ showBankForm: false });
  };



  render() {
    const { showBankForm, isLoading } = this.state;
    const { handleSubmit } = this.props;
    return (
      <div>

        <div className="or-seperator"><img src={orIcon} /></div>
        <button className="AcceptUI2" onClick={() => this.showBankForm()}>Pay Using Bank</button>
        {/* <div className="or-seperator"><img src={orIcon} /></div> */}

        {/* LOADER CODE START */}
        {/* <div className="payment-loader">
          <div>
            <div className="pl-text">Payment Processing</div>
            <div className="spinner">
              <div className="rect1"></div>
              <div className="rect2"></div>
              <div className="rect3"></div>
              <div className="rect4"></div>
              <div className="rect5"></div>
            </div>
          </div>
        </div> */}
        {/* LOADER CODE END */}

        <Dialog
          open={showBankForm}
          onClose={this.handleClose}
          aria-labelledby="form-dialog-title"
          className="dialogbox-ui small"
        >
          <DialogContent>
            <h2 className="modal-title">Pay Using Bank <Button variant="contained" classes={{ root: 'modal-close' }} onClick={this.handleClose} color="secondary"></Button></h2>
            <form  >
              <FormSection name="bankData">
                <div className="form-d">
                  <Field name="bankAccountNumber" placeholder="Account Number" label="Account Number" component={TextFieldInput} />
                </div>
                <div className="form-d">
                  <Field name="bankRoutingNumber" placeholder="Routing Number" label="Routing Number" component={TextFieldInput} />
                </div>
                <div className="form-d">
                  <Field name="accountName" placeholder="Name On Account" label="Name On Account" component={TextFieldInput} />
                </div>
                <div className="form-d">
                  <Field name="accountType" placeholder="Account Type" label="Account Type" component={TextFieldInput} />
                </div>

                <Field name="dataValue" type="hidden" component={TextFieldInput} />

                <Field name="dataDescriptor" type="hidden" component={TextFieldInput} />

              </FormSection>
              <Button variant="contained" color="primary" classes={{ root: 'add-cart-button' }} onClick={this.sendPaymentDataToAnet} disabled={isLoading}>{!isLoading && 'Pay Now'}{isLoading && <CircularProgress size={24} />}</Button>
              <DialogActions className="m-footer">
                
              </DialogActions>
            </form>
          </DialogContent>
        </Dialog>
      </div>
    );
  }
}

PaymentWithCheck =  reduxForm({
  form: 'payWithCard',
  asyncValidate
})(PaymentWithCheck);

export default PaymentWithCheck;




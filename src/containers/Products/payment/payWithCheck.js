import React, { Component } from 'react';
import axios from 'axios';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import {TextFieldInput} from '../../../components/common/MaterialUiComponents';
import {Field,reduxForm,FormSection} from 'redux-form';
import orIcon from './../../../assets/images/or-icon.png';


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

 class Payment extends Component {
  constructor() {
    super();
    this.state = {
      showBankForm: false
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

  sendPaymentDataToAnet = (bankData) => {
    var authData = {};
    authData.clientKey = "8ZMyKqM535uy2Hp3gH3gweJHUSB5Sc9sV6d4v88Sq5nhzx8T2NhSe7DPztp5qq32";
    authData.apiLoginID = "7Eu6Q6YbMx";

    // If using banking information instead of card information,
    // build a bankData object instead of a cardData object.
    var secureData = {};
    secureData.authData = authData;

    secureData.bankData = bankData;

    window.Accept.dispatchData(secureData, responseHandler);

    function responseHandler(response) {
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
        // paymentFormUpdate(response.opaqueData);
        axios.post('http://localhost:3000/chargeByNonce', response).then((data) => {
          console.log(data, "data is here");
        })
          .catch((err) => {
            console.log(err, "error is here")
          })
      }
    }
  }
  showBankForm() {
    this.setState({ showBankForm: !this.state.showBankForm });
  }
  handleClose = () => {
    this.setState({ showBankForm: false });
  };
 


  render() {
    const { showBankForm } = this.state;
    const {handleSubmit} = this.props;
    return (
      <div>
       
        <div className="or-seperator"><img src={orIcon} /></div>
        <button className="AcceptUI2" onClick={() => this.showBankForm()}>Pay Using Bank</button>
        <div className="or-seperator"><img src={orIcon} /></div>
        <Dialog
          open={showBankForm}
          onClose={this.handleClose}
          aria-labelledby="form-dialog-title"
          className="dialogbox-ui small"
        >
          <DialogContent>
            <h2 className="modal-title">Pay Using Bank <Button variant="contained" classes={{ root: 'modal-close' }} onClick={this.handleClose} color="secondary"></Button></h2>
            <form onSubmit={handleSubmit(this.sendPaymentDataToAnet)} >
               <FormSection name="bankData">
              <div className="form-d">
                <Field name="accountNumber" placeholder="Account Number" label="Account Number" component={TextFieldInput}/>
              </div>
              <div className="form-d">
                <Field name="routingNumber" placeholder="Routing Number" label="Routing Number" component={TextFieldInput}/>
              </div>
              <div className="form-d">
                <Field name="nameOnAccount" placeholder="Name On Account" label="Name On Account" component={TextFieldInput}/>
              </div>
              <div className="form-d">
                <Field name="accountType" placeholder="Account Type" label="Account Type" component={TextFieldInput}/>
              </div>
              
              <Field name="dataValue"  type="hidden" component={TextFieldInput}/>            
            
              <Field name="dataDescriptor"  type="hidden"  component={TextFieldInput}/>
              
              </FormSection>
            </form>

          </DialogContent>
          <DialogActions className="m-footer">
            <Button variant="contained" type="submit"  color="primary">
              Pay Now
            </Button>
          </DialogActions>
        </Dialog>

        {/* {showBankForm ? <form id="paymentForm"
          method="POST"
          action="https://YourServer/PathToExistingPaymentProcessingScript" >
          <input type="text" name="accountNumber" id="accountNumber" placeholder="accountNumber" /> <br />
          <input type="text" name="routingNumber" id="routingNumber" placeholder="routingNumber" /> <br />
          <input type="text" name="nameOnAccount" id="nameOnAccount" placeholder="nameOnAccount" /> <br />
          <input type="text" name="accountType" id="accountType" placeholder="accountType" /> <br />
          <input type="hidden" name="dataValue" id="dataValue" />
          <input type="hidden" name="dataDescriptor" id="dataDescriptor" />
          <button type="button" onClick={() => this.sendPaymentDataToAnet()}>Pay</button>
        </form> : null} */}
      </div>
    );
  }
}

export default reduxForm({
    form:'payWithCard'
})(Payment)





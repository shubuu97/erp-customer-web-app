import React, { Component } from 'react';
import axios from 'axios';
// var Accept;
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
const response = (data) => {
  axios.post('http://localhost:3000/chargeByNonce', data).then((data) => {
    console.log(data, "data is here");
  })
    .catch((err) => {
      console.log(err, "error is here")
    })
}
window.response = response;

export default class Payment extends Component {
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
  sendPaymentDataToAnet = () => {
    var authData = {};
    authData.clientKey = "8ZMyKqM535uy2Hp3gH3gweJHUSB5Sc9sV6d4v88Sq5nhzx8T2NhSe7DPztp5qq32";
    authData.apiLoginID = "7Eu6Q6YbMx";

    // If using banking information instead of card information,
    // build a bankData object instead of a cardData object.

    var bankData = {};
    bankData.accountNumber = document.getElementById('accountNumber').value;
    bankData.routingNumber = document.getElementById('routingNumber').value;
    bankData.nameOnAccount = document.getElementById('nameOnAccount').value;
    bankData.accountType = document.getElementById('accountType').value;

    var secureData = {};
    secureData.authData = authData;
    // secureData.cardData = cardData;
    // If using banking information instead of card information,
    // send the bankData object instead of the cardData object.
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
  render() {
    const { showBankForm } = this.state;
    return (
      <div>
        <form id="paymentForm"
          method="POST"
          action="https://YourServer/PathToExistingPaymentProcessingScript">
          <input type="hidden" name="dataValue" id="dataValue" />
          <input type="hidden" name="dataDescriptor" id="dataDescriptor" />
          <button type="button"
            className="AcceptUI"
            data-billingAddressOptions='{"show":true, "required":true}'
            data-apiLoginID="7Eu6Q6YbMx"
            data-clientKey="8ZMyKqM535uy2Hp3gH3gweJHUSB5Sc9sV6d4v88Sq5nhzx8T2NhSe7DPztp5qq32"
            data-acceptUIFormBtnTxt="Submit"
            data-acceptUIFormHeaderTxt="Card Information"
            data-responseHandler="response">Pay
    </button>
        </form>

        <button onClick={() => this.showBankForm()}>Pay Using bank</button>

        {showBankForm ? <form id="paymentForm"
          method="POST"
          action="https://YourServer/PathToExistingPaymentProcessingScript" >
          <input type="text" name="accountNumber" id="accountNumber" placeholder="accountNumber" /> <br />
          <input type="text" name="routingNumber" id="routingNumber" placeholder="routingNumber" /> <br />
          <input type="text" name="nameOnAccount" id="nameOnAccount" placeholder="nameOnAccount" /> <br />
          <input type="text" name="accountType" id="accountType" placeholder="accountType" /> <br />
          <input type="hidden" name="dataValue" id="dataValue" />
          <input type="hidden" name="dataDescriptor" id="dataDescriptor" />
          <button type="button" onClick={() => this.sendPaymentDataToAnet()}>Pay</button>
        </form> : null}
      </div>
    );
  }
}






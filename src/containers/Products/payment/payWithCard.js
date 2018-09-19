import React,{Component} from 'react';
import orIcon from './../../../assets/images/or-icon.png';

import axios from 'axios';
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
  export default class PayWithCard extends Component
  {
      constructor(props)
      {
          super(props)
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

    render()
    {
        return(
            <form id="paymentForm"
method="POST"
action="https://YourServer/PathToExistingPaymentProcessingScript">
<input type="hidden" name="dataValue" id="dataValue" />
<input type="hidden" name="dataDescriptor" id="dataDescriptor" />
<div className="or-seperator"><img src={orIcon} /></div>
<button type="button"
  className="AcceptUI"
  data-billingAddressOptions='{"show":true, "required":true}'
  data-apiLoginID="7Eu6Q6YbMx"
  data-clientKey="8ZMyKqM535uy2Hp3gH3gweJHUSB5Sc9sV6d4v88Sq5nhzx8T2NhSe7DPztp5qq32"
  data-acceptUIFormBtnTxt="Submit"
  data-acceptUIFormHeaderTxt="Card Information"
  data-responseHandler="response">Pay Using Card
</button>
</form>
        )
    }
 

      

  }
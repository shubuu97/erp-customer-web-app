
import React, { Component } from 'react';
import axios from 'axios';
import _find from 'lodash/find';
import orIcon from './../../../assets/images/or-icon.png';

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


export default class PaymentWithPaypal extends Component {
 

showPayPalButton=()=>
{
  var totalAmount = this.props.totalAmount;
  var onPayClick = this.props.onPay;
  var onCancelPayment = this.props.onCancelPayment;
  window.paypal.Button.render({

    // Set your environment

    env: 'sandbox', // sandbox | production

    // Specify the style of the button

    style: {
        layout: 'vertical',  // horizontal | vertical
        size:   'medium',    // medium | large | responsive
        shape:  'rect',      // pill | rect
        color:  'gold'       // gold | blue | silver | black
    },

    // Specify allowed and disallowed funding sources
    //
    // Options:
    // - paypal.FUNDING.CARD
    // - paypal.FUNDING.CREDIT
    // - paypal.FUNDING.ELV

    funding: {
        allowed: [window.paypal.FUNDING.ELV, window.paypal.FUNDING.CARD, window.paypal.FUNDING.CREDIT ],
        disallowed: [ ]
    },

    // PayPal Client IDs - replace with your own
    // Create a PayPal app: https://developer.paypal.com/developer/applications/create

    client: {
        sandbox:    this.props.detail.clientKey,
        production: '<insert production client id>'
    },

    payment: function(data, actions) {
        return actions.payment.create({
            payment: {
                transactions: [
                    {
                        amount: { total: totalAmount, currency: 'USD' }
                    }
                ]
            }
        });
    },

    onAuthorize: function(data, actions) {
        return actions.payment.execute().then(function() {
          console.log(data);
            onPayClick(data, 'paypal');
        });
    },
    onCancel:function (data,actions)
    {
      actions.close();
      console.log(actions,"actions is here");
      onCancelPayment("You have cancelled payment");
      // window.alert("You cancelled")
    },
    onError:function(err)
    {
        onCancelPayment(err.message);
        console.log(err,"error is here")
    }

}, '#paypal-button-container');
  this.setState({})
}
  componentDidMount() {
    console.log("In the paypal config", this.props);
    let payPalFound = false;
     for(let i=0;i<document.scripts.length;i++)
     {
     if(document.scripts[i].src=="https://www.paypalobjects.com/api/checkout.js")
     {
      payPalFound=true;
     }
     }
    if(!payPalFound)
    new_script("https://www.paypalobjects.com/api/checkout.js").then((data) => {
     this.showPayPalButton();
    
    })
      .catch((err) => {
        console.log(err)
      })
      else
      {
        this.showPayPalButton();
      }
  }
 

  
  render() {
    return (
      <div>
        <div className="or-seperator"><img src={orIcon} /></div>
        <div style={{display:'flex'}}>
      
      <div id="paypal-button-container"></div>
      </div>
      </div> 
    );
  }
}


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


export default class Payment extends Component {
 


  componentDidMount() {
    new_script("https://www.paypalobjects.com/api/checkout.js").then((data) => {

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
            sandbox:    'AQiDQ3GsA3afvvAANKU9QBTP2M3sMFmxDYbg6uLDgjmVI2Ux75WjlPTxyBsLv2auG_fI9rhNw8Rwp02G',
            production: '<insert production client id>'
        },

        payment: function(data, actions) {
            return actions.payment.create({
                payment: {
                    transactions: [
                        {
                            amount: { total: '100', currency: 'USD' }
                        }
                    ]
                }
            });
        },

        onAuthorize: function(data, actions) {
            return actions.payment.execute().then(function() {
              console.log(data);
                window.alert('Payment Complete!');
            });
        },
        onCancel:function (data,actions)
        {
          actions.close();
          console.log(actions,"actions is here");
          window.alert("You cancelled")
        },
        onError:function(err)
        {
            console.log(err,"error is here")
        }

    }, '#paypal-button-container');
      this.setState({})
    })
      .catch((err) => {
        console.log(err)
      })
  }
 

  
  render() {
    return (
      <div style={{display:'flex'}}>
      <div id="paypal-button-container"></div>
      </div>
    );
  }
}

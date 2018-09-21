import React, { Component } from 'react';
import orIcon from './../../../assets/images/or-icon.png';
import axios from 'axios';
import _find from 'lodash/find';
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

export default class PayWithCard extends Component {
  constructor(props) {
    super(props)
    window.response = this.response;
    this.state = {
      count:0
    }

  }

  componentDidMount() {
    let acceptUiV3Found = false;
    let acceptUiV1Found = false;
    for (let i = 0; i < document.scripts.length; i++) {
      if (document.scripts[i].src == "https://jstest.authorize.net/v3/AcceptUI.js") {
        acceptUiV3Found = true;
      }
      if (document.scripts[i].src == "https://jstest.authorize.net/v1/Accept.js") {
        acceptUiV1Found = true;
      }
    }
    console.log(acceptUiV1Found, acceptUiV3Found, "jj")
    if (!acceptUiV3Found)
      new_script("https://jstest.authorize.net/v3/AcceptUI.js");
    if (!acceptUiV1Found)
      new_script("https://jstest.authorize.net/v1/Accept.js").then((data) => {
        console.log("chal gai", data);
      })
        .catch((err) => {
          console.log(err)
        })
   
  }

  response = (data) => {
    this.state.count=this.state.count+1
    if (data.messages.resultCode === "Error") {
      var i = 0;
      while (i < data.messages.message.length) {
        console.log(
          data.messages.message[i].code + ": " +
          data.messages.message[i].text
        );
        i = i + 1;
      }
    } else {
      if(this.state.count%2==0)
      this.props.onPay(data);
    }
  }
  

  render() {
    return (
      <form>
        <input type="hidden" name="dataValue" id="dataValue" />
        <input type="hidden" name="dataDescriptor" id="dataDescriptor" />
        {this.props.payNow ? <div className="or-seperator"><img src={orIcon} /></div> : null}
        <button type="button"
          className="AcceptUI"
          data-billingAddressOptions='{"show":true, "required":true}'
          data-apiLoginID={this.props.detail.apiLoginKey}
          data-clientKey={this.props.detail.clientKey}
          data-acceptUIFormBtnTxt="Submit"
          data-acceptUIFormHeaderTxt="Card Information"
          data-responseHandler="response">Pay Using Card
</button>
      </form>
    )
  }




}
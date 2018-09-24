import React, { Component } from 'react';
import orIcon from './../../../assets/images/or-icon.png';
import axios from 'axios';
import _find from 'lodash/find';

export default class PayWithCard extends Component {
  constructor(props) {
    super(props)

    window.response = (data) => {
      console.log("Authorize.net load called");
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
        this.props.onPay(data);
      }
    }

  }
  removeJS(filename) {
    var tags = document.getElementsByTagName('script');
    for (var i = tags.length; i >= 0; i--) { //search backwards within nodelist for matching elements to remove
      if (tags[i] && tags[i].getAttribute('src') != null && tags[i].getAttribute('src').includes(filename))
        tags[i].parentNode.removeChild(tags[i]); //remove element by calling parentNode.removeChild()
    }
  }
  new_script(src) {
    return new Promise(function (resolve, reject) {
      console.log("sccpp");
      var script = document.createElement('script');
      script.src = src;
      script.addEventListener('load', function () {
        console.log('loaded_kuldeep');
        resolve();
      });
      script.addEventListener('error', function (e) {
        reject(e);
      });
    })
  };

  componentDidMount() {
    this.removeJS('jstest.authorize.net');
    this.new_script("https://jstest.authorize.net/v3/AcceptUI.js");
  }

  render() {
    return (
      <div onClick={(e) => { e.preventDefault(); console.log("Defauklt") }}>
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
      </div>
    )
  }




}
import React, { Component } from "react";
import Paypal from './paypal';
import PayWithCard from './payWithCard';
import PayWithCheck from './payWithCheck';
import _get from 'lodash/get';

export default class Payment extends Component {
  constructor() {
    super();
    this.state = {
      paypal: {},
      authorizeNet: {}
    }
  }
  componentDidMount() {
    const { paymentConfig } = this.props;
    paymentConfig.forEach((vendor) => {
      if (_get(vendor, 'vendor') == "Pay-Pal" && _get(vendor, 'status') == "Active" && _get(vendor, 'clientKey')) {
        let paypal = {
          show: true,
          clientKey: _get(vendor, 'clientKey')
        }
        this.setState({ paypal });
      }
      if (_get(vendor, 'vendor') == "Authorize.net" && _get(vendor, 'status') == "Active" && _get(vendor, 'clientKey') && _get(vendor, 'apiLoginKey') && _get(vendor, 'transactionKey')) {
        let authorizeNet = {
          show: true,
          clientKey: _get(vendor, 'clientKey'),
          apiLoginKey: _get(vendor, 'apiLoginKey'),
          transactionKey: _get(vendor, 'transactionKey')
        }
        this.setState({ authorizeNet });
      }
    })
  }

  render() {
    const { paypal, authorizeNet } = this.state;
    return (
      <div>
        {authorizeNet.show && <PayWithCard detail={authorizeNet} />}
        {authorizeNet.show && <PayWithCheck detail={authorizeNet} />}
        {paypal.show && <Paypal detail={paypal} />}

      </div>
    )
  }
}
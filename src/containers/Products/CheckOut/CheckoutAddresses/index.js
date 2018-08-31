import React from 'react';
import Button from '@material-ui/core/Button';
import BillingAddress from './BillingAddress';
import ShippingAddress from './ShippingAddress'

export default (props) => {
  return (
    <div className="billing-address">
      <div className="biling-address-title">
        <h4> {props.type}</h4>
      </div>
      <div className="address-content">
        <div className="address-detail">
          <h5>{props.name}</h5>
          <p>{props.address.companyAddress || props.address.address}, {props.address.city}, {props.address.state}, {props.address.country}- {props.address.zipCode}</p>
        </div>
      </div>
      <div className="addToCartButtonDiv">
      {props.type=="Billing Address"?<BillingAddress/>:<ShippingAddress/>}
        
      </div>

    </div>)
}
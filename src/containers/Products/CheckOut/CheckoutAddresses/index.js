import React from 'react';
import Button from '@material-ui/core/Button';

export default (props) => {
  return (
    <div className="billing-address">
      <div className="biling-address-title">
        <h4> {props.type}</h4>
      </div>
      <div className="address-content">
        <div className="address-detail">
          <h5>{props.name}</h5>
          <p>{props.address.companyAddress}, {props.address.city}, {props.address.state}, {props.address.country}- {props.address.zipCode}</p>
        </div>
      </div>
      <div className="addToCartButtonDiv">
        <Button variant="contained" size='large' color="secondary" classes={{ root: 'add-cart-button' }} >New Address</Button>
      </div>

    </div>)
}
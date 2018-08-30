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
          <h5>Chris Brown</h5>
          <p>malviya nagar jaipur, Rajsthan, India - 302012</p>
        </div>
        <div className="address-detail">
          <h5>Chris Brown</h5>
          <p>malviya nagar jaipur, Rajsthan, India - 302012</p>
        </div>
        <div className="address-detail">
          <h5>Chris Brown</h5>
          <p>malviya nagar jaipur, Rajsthan, India - 302012</p>
        </div>
      </div>
      <div className="addToCartButtonDiv">
        <Button variant="contained" size='large' color="secondary" classes={{ root: 'add-cart-button' }} >New Address</Button>
      </div>

    </div>)
}
import React from 'react';
import Button from '@material-ui/core/Button';

export default (props) => {
  return (
   <div className="cart-total-container col-md-3">
    <div className="cart-total-title">
        Summary
    </div>
    <div className="cart-total-subtotal cart-item">
        Subtotal  <span>{props.currency} {props.details.subTotal}</span>
    </div>
    <div className="cart-total-shipping cart-item">
        Shipping Cost <span>{props.currency} {props.details.shipping}</span>
    </div>
    <div className="cart-total-tax cart-item">
        Tax <span>{props.currency} {props.details.tax}</span>
    </div>
    <div className="cart-total-total cart-item">
        Order Total <span>{props.currency} {props.details.total}</span>
    </div>
    {/* <div className="apply-discount">
        <div className="d-flex justify-content-between">
            <label>Apply Discount Code</label>
            <i className="fa fa-angle-left"></i>
        </div>
        <div className="d-flex justify-content-between">
            <input className="form-control" placeholder="Enter Discount Code"></input>
            <Button variant="contained" color="secondary">Apply</Button>
        </div>
    </div> */}
    <div className="col-sm-12 cart-item-button">
        <Button variant="contained" size='large' color="primary" classes={{ root: 'add-cart-button' }} onClick={props.goToCheckout}>Proceed to Checkout</Button>
    </div>
   </div>
  )
}
import React from 'react';

export default (props) => {
  return (
   <div className="cart-total-container col-sm-3">
    <div className="cart-total-title">
        CART TOTALS
    </div>
    <div className="cart-total-subtotal cart-item">
        SUBTOTAL  <span>USD {props.details.subTotal}</span>
    </div>
    <div className="cart-total-shipping cart-item">
        SHIPPING <span>USD {props.details.shipping}</span>
    </div>
    <div className="cart-total-tax cart-item">
        TAX <span>USD {props.details.tax}</span>
    </div>
    <div className="cart-total-total cart-item">
        TOTAL <span>USD {props.details.total}</span>
    </div>
   </div>
  )
}
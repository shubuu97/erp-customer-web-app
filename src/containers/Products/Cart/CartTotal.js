import React from 'react';

export default (props) => {
  return (
   <div className="cart-total-container">
    <div className="cart-total-title">
        CART TOTALS
    </div>
    <div className="cart-total-subtotal cart-item">
        SUBTOTAL  <span>USD 56</span>
    </div>
    <div className="cart-total-shipping cart-item">
        SHIPPING <span>USD 7</span>
    </div>
    <div className="cart-total-tax cart-item">
        TAX <span>USD 9</span>
    </div>
    <div className="cart-total-total cart-item">
        TOTAL <span>USD 80</span>
    </div>
   </div>
  )
}
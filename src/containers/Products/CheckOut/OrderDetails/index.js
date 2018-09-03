import React from 'react';
import Button from '@material-ui/core/Button';
import { Collapse } from 'reactstrap';
import Select from 'react-select';
export default (props) => {
  return (
    <div className="cart-total-container col-sm-3">
      <div className="cart-total-title">
        Order Summary
    </div>
      <div>
        <Button color="primary" onClick={props.toggle} style={{ marginBottom: '1rem' }}>{props.cartProductList.length > 0 ? props.cartProductList.length : 'No'} items in cart</Button>
        <Collapse isOpen={props.collapse}>
          <div className="checkout-product-list">
            {props.cartProductList && props.cartProductList.map((item) => (
              <div key={item.itemId} className="cart-total-subtotal cart-item">
                {item.itemInfo.itemName} * {item.quantity || 1}  <span>$ {item.itemInfo.price * (item.quantity || 1)}</span>
              </div>
            ))}
          </div>
        </Collapse>
      </div>
      <div className="cart-total-subtotal cart-item">
        Subtotal  <span>$ {props.subTotal}</span>
      </div>
      <div className="cart-total-shipping cart-item">
        Shipping Cost <span>$ 10</span>
      </div>
      <div className="cart-total-tax cart-item">
        Tax <span>$ 8</span>
      </div>
      <div className="cart-total-total cart-item">
        Order Total <span>$ {props.orderTotal}</span>
      </div>
      <div>
        <Select
          name={'payment-term'}
          placeholder={'Payment Terms'}
          value={props.paymentTerm}
          options={props.paymentTerms}
          onChange={props.paymentTermUpdate}
        />
      </div>
      <div className="privacy-text cart-item">
        Your personal data will be used to process your order,
        support your experience throughtout this website and for other
        purposes described in our privacy policy.
      </div>
      <div className="cart-item">
        <input type="checkbox" value={props.termCondition} onChange={props.selectTermCondition} />
        <span className="term-conditions">I have read and agree to the website terms and conditions*</span>
      </div>
      {props.showError && <div className="text-input error">
        <p>* Please accept terms and conditions.</p>
      </div>}
      <div className="col-sm-12 cart-item-button">
        <Button variant="contained" size='large' color="primary" classes={{ root: 'add-cart-button' }} onClick={props.placeOrder}>PLACE ORDER</Button>
      </div>
    </div>
  )
}

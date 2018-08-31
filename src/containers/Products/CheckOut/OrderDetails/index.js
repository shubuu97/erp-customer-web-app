import React from 'react';
import Button from '@material-ui/core/Button';
import { Collapse, CardBody, Card } from 'reactstrap';
export default (props) => {
  return (
    <div className="cart-total-container col-sm-3">
      <div className="cart-total-title">
        Order Summary
    </div>
      <div>
        <Button color="primary" onClick={props.toggle} style={{ marginBottom: '1rem' }}>item count</Button>
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
      <div className="col-sm-12 cart-item-button">
        <Button variant="contained" size='large' color="primary" classes={{ root: 'add-cart-button' }} onClick={props.placeOrder}>PLACE ORDER</Button>
      </div>
    </div>
  )
}

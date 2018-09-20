import React from 'react';
import Button from '@material-ui/core/Button';
import { Collapse } from 'reactstrap';
import Select from 'react-select';
import CircularProgress from '@material-ui/core/CircularProgress';
import Payment from '../../payment';
import paymentIinfo from './../../../../assets/images/info.png';

 const orderDetails = (props) => {
  return (
    <div className="cart-total-container col-md-3">
      <div className="cart-total-title">
        Order Summary
    </div>
      <div className="checkout-product-list">
        <Button color="primary" onClick={props.toggle} classes={{ root: 'item-button' }}>{props.cartProductList.length > 0 ? props.cartProductList.length : 'No'} items in cart <i class="fa fa-angle-down"></i></Button>
        <Collapse isOpen={props.collapse}>
          <div>
            {props.cartProductList && props.cartProductList.map((item) => (
              <div key={item.itemId} className="cart-total-subtotal cart-item">
                {item.aliasName || item.itemName} * {item.quantity || 1}  <span>$ {item.price * (item.quantity || 1)}</span>
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
      <div className="cart-total-subtotal cart-item payment-term">
        <label>Payment Terms</label>
        <span>{props.paymentTerm.value}</span>
        {/* <Select
          name={'payment-term'}
          placeholder='Payment Terms'
          value={props.paymentTerm}
          options={props.paymentTerms}
          onChange={props.paymentTermUpdate}
        /> */}
      </div>
      <div className="privacy-text cart-item">
        Your personal data will be used to process your order,
        support your experience throughout this website and for other
        purposes described in our privacy policy. {props.isLoading}
      </div>
      <div className="cart-item checkbox-custom">
        <label>
          <input type="checkbox" value={props.termCondition} onChange={props.selectTermCondition} />
          <span className="term-conditions">I have read and agree to the website terms and conditions*</span>
        </label>
      </div>
      {props.showError && <div className="text-input error">
        <p>* {props.showError}</p>
      </div>}
      <div className="d-flex">
      
        <div className="pay-now checkbox-custom">
          <label>
            <input type="checkbox" onChange={()=>props.handlePay()} />
            <span className="">Pay Now</span>
          </label>
        </div>
      
        <span className="p-info"><img src={paymentIinfo} /></span>
      </div>
      <div>
       { props.payNow? <Select
          name={'payment-Method'}
          placeholder='Payment Method'
          value={props.paymentMethod}
          options={props.paymentMethods}
          onChange={props.paymentMethodUpdate}
        />:null
       }
      </div>
     {!props.payNow? <div className="col-sm-12 cart-item-button">
        <Button variant="contained" size='large' color="primary" classes={{ root: 'add-cart-button' }} onClick={props.placeOrder} disabled={props.isLoading}>{!props.isLoading && 'PLACE ORDER'}{props.isLoading && <CircularProgress size={24} />}</Button>
      </div>:null}
      {props.payNow?<Payment/>:null}
    </div>
  )
}


export default orderDetails
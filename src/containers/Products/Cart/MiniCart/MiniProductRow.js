import React from 'react';
import trash from './../../../../assets/images/delete-button.png';
import cartedit from './../../../../assets/images/edit.png';

export default (props) => {

  console.log(props, "props is here")
  return (
    <div className="miniCart-parent">
      <div className="miniCart-img">
        <img className="row-product-img" src={props.image} alt={props.name} />
      </div>
      <div className="miniCart-middle">
        <label>{props.name}</label>
        <h4 className="mini-price">
          {/* {props.price} */}
          $ {props.price || '0'} Per {props.weight}
        </h4>
        <div className="mini-qty">
          <span>Qty</span>
          <div className="row-quantity mc-qty">
            <button onClick={() => props.updateQuantity(props.id, 'sub')}>-</button>
            <div className="row-quantity-item">{props.quantity}</div>
            <button onClick={() => props.updateQuantity(props.id, 'add')}>+</button>
          </div>
          {/* <input type="textbox"
            value={props.quantity}
            onChange={(e) => props.updateQuantity(props.id, e.target.value)}
          /> */}
        </div>
      </div>
      <div className="mini-cartAction">
        {/* <img src={cartedit} /> */}
        <img src={trash} onClick={() => props.remove(props.id)} />
      </div>
    </div>
  )
}
import React from 'react';
import trash from './../../../assets/images/delete-button.png';
import cartedit from './../../../assets/images/edit.png';

export default (props) => {
  return (
    <div className="row-container">
      <div className="row-product">
        
        <img className="row-product-img" src={props.image} alt={props.name} />
        <div className="row-name-code">
          <h4>{props.name}</h4>
          {/* <h4>{props.code}</h4> */}
        </div>
      </div>
      <div className="row-price">
        <h4>{props.price}</h4>
      </div>
      <div className="row-quantity">
        <div className="d-flex">
        <button onClick={()=>props.updateQuantity(props.id,'sub')}>-</button>
        <div className="row-quantity-item">{props.quantity}</div>        
        <button onClick={()=>props.updateQuantity(props.id,'add')}>+</button>
        </div>
      </div>
      <div className="row-total">
        <h4>{props.total || props.price || '0'}</h4>
      </div>
      <div className="row-action">
      <img src={cartedit} />
      <img src={trash} onClick={()=>props.remove(props.id)}/>
      </div>
    </div>
  )
}
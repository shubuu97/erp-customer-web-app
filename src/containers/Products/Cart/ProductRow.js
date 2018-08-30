import React from 'react';

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
        <button onClick={()=>props.updateQuantity(props.id,'add')}>+</button>
        <div className="row-quantity-item">{props.quantity}</div>
        <button onClick={()=>props.updateQuantity(props.id,'sub')}>-</button>
        </div>
      </div>
      <div className="row-total">
        <h4>{props.total || props.price || '0'}</h4>
      </div>
      <div className="row-action">
      <i className="fa fa-trash-o" onClick={()=>props.remove(props.id)}></i>
      </div>
    </div>
  )
}
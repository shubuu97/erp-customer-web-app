import React from 'react';

export default (props) => {
  return (
    <div className="row-container">
      <div className="row-product">
        <img className="row-product-img" src={props.image} alt={props.name} />
        <div className="row-name-code">
          <h4>{props.name}</h4>
          <h4>{props.code}</h4>
        </div>
      </div>
      <div className="row-price">
        <h4>{props.price}</h4>
      </div>
      <div className="row-quantity">
        
      </div>
      <div className="row-total">
        <h4>678</h4>
      </div>
    </div>
  )
}
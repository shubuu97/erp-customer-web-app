import React from 'react';

export default (props) => {
  return (
    <div className="col-sm-3 product-parent" onClick={(e)=>{props.click && props.click(props.detail)}}>
      <div className="product">
        <div className="product-content">
          <div className="product-image">
            <img className="img-responsive" src={props.image} alt={props.name} />
          </div>
          <div className="product-price">${props.price}</div>
          <div className="product-code">Item Code:<span> {props.code}</span></div>
          <h4 className="product-name">{props.name}</h4>
          <span className="quick-view" title="View Details"></span>
        </div>
      </div>
    </div>
  )
}
import React from 'react';

export default (props) => {
  return (
    <div className="col-sm-4 product-parent" onClick={(e)=>{props.click && props.click(props.detail)}}>
      <div className="product">
          <div className="product-image">
            <img className="img-responsive" src={props.image} alt={props.name} />
          </div>
          <div className="product-content">
            <h4 className="product-name">{props.name}</h4>
            <div className="product-price">${props.price}</div>
            {/* <div className="product-code">Item Code:<span> {props.code}</span></div> */}
            {/* <span className="quick-view" title="View Details"></span> */}
        </div>
      </div>
    </div>
  )
}
import React from 'react';
import info from '../../../assets/images/info.png';

export default (props) => {
  return (
    <div className="col-sm-4 product-parent" >
      <div className="product">
        <div className="product-image" onClick={(e) => { props.click && props.click(props.detail) }}>
          <img className="img-responsive" src={props.image} alt={props.name} />
        </div>
        <div className="product-content" onClick={(e) => { props.click && props.click(props.detail) }}>
          <h4 className="product-name">{props.name}</h4>
          <div className="product-price">${props.price}</div>
          {/* <div className="product-code">Item Code:<span> {props.code}</span></div> */}
          {/* <span className="quick-view" title="View Details"></span> */}
        </div>
        <img src={info} onClick={()=>props.showInfo(props.detail)}/>
      </div>
    </div>
  )
}
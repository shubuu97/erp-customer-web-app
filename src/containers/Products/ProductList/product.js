import React from 'react';
import info from '../../../assets/images/info.png';
import Button from '@material-ui/core/Button';

export default (props) => {
  if (props.isGridView) {
    return (
      <div className="col-sm-6 col-md-4 col-lg-3 product-parent" >
        <div className="product">
          <div className="product-image" onClick={(e) => { props.click && props.click(props.detail) }}>
            <img className="img-responsive" src={props.image} alt={props.name} />
          </div>
          <div className="product-content">
            <div className="pc-1" onClick={(e) => { props.click && props.click(props.detail) }}>
              <h4 className="product-name">{props.name}</h4>
              <div className="product-price">{props.currency} {props.price}</div>
              {/* <div className="product-code">Item Code:<span> {props.code}</span></div> */}
              {/* <span className="quick-view" title="View Details"></span> */}
            </div>
            <div className="pc-2">
             <span data-toggle="tooltip" data-placement="bottom" title="Hooray!"> <img className="info-icon" src={info} onClick={() => props.showInfo(props.detail)} /></span>
            </div>
          </div>

        </div>
      </div>
    )
  } else {
    return (
      <div className="col-sm-12 hidden-xs">
      <div className="product-list-box">
        <div className="product-list-img">
          <img className="img-responsive" src={props.image} alt={props.name} onClick={(e) => { props.click && props.click(props.detail)}}/>
        </div>
        <div className="product-list-content">
          <div className="pro-head">
            <h4 className="product-name" onClick={(e) => { props.click && props.click(props.detail)}}>{props.name}</h4>
            <div className="pc-2">
            <span title="Product Info">  <img className="info-icon" src={info} onClick={() => props.showInfo(props.detail)}/></span>
            </div>
          </div>
          <div className="product-price">{props.currency} {props.price}</div>
          <p class="p-desc">{props.description}</p>
          {/* <Button color='primary' variant='contained' onClick={()=>props.addToCart(props.detail)}>Add to Cart</Button> */}
        </div>
      </div>
      </div>
    )
  }
}
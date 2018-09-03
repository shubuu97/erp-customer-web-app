import React from 'react';
import Button from '@material-ui/core/Button';
import productPlaceholder from '../../../assets/images/product-image-placeholder.jpg';

export default (props) => {
  return (
    <div className="productDetails-container container">
      <ul className="breadcrumb">
        <li>Home</li>
        <li>Indica</li>
        <li>{props.detail.itemInfo.itemName}</li>
      </ul>
      <div className="detailsContent">
        <div className="imageContent">
          <div className="mainImage">
            <img className="img-responsive" src={props.mainImageUrl.url} alt={props.detail.itemInfo.itemName} />
          </div>
          <div className="subImages">
            {props.detail.itemInfo.images && props.detail.itemInfo.images.map((image, key) => (
              <img key={key} onClick={()=>props.updateMainImage(image)} className="img-responsive" src={image.url || productPlaceholder} alt={props.detail.itemInfo.itemName} />
            ))}
          </div>
        </div>
        <div className="descriptionContent">
          <div className="namePriceDiv">
            <h2 className="p-name">{props.detail.itemInfo.itemName}</h2>
            <p className="ic text-uppercase">Item Code: <span>{props.detail.itemInfo.itemNo}</span></p>
            {/* <p className="ic">Unit Count: <span>{props.detail.itemInfo.unitCount}</span></p> */}
            <h3 className="p-price">$ {props.detail.itemInfo.price}</h3>
            <div className="d-flex wq-bar">
              <label>Weight</label>
              <span>{props.detail.itemInfo.unitCount} Grams</span>
            </div>
            <div className="d-flex wq-bar align-center">
              <label>Quantity</label>
              <div className="d-flex">
                <div className="row-quantity-item-detail">{props.detail.quantity}</div>
                <div className="row-quantity-increase">
                  <button onClick={() => props.updateQuantity('add')}>+</button>
                  <button onClick={() => props.updateQuantity('sub')}>-</button>
                </div>
              </div>
            </div>
            <div className="d-flex wq-bar">
              <label>In Stock</label>
            </div>
          </div>
          <div className="addToCartButtonDiv">
            <Button variant="contained" size='large' color="primary" classes={{ root: 'add-cart-button' }} onClick={() => props.addToCart()}>ADD TO CART</Button>
            {/* <Button variant="contained" size='large' color="inherit" classes={{ root: 'buy-cart-button' }} onClick={() => props.buyProduct()}>BUY NOW</Button> */}
            <p className="p-desc"><b>Description</b>{props.detail.itemInfo.itemDesc} </p>
          </div>
        </div>
      </div>
      <div className="table-responsive table-product-detail">
        <table className="table">
          <thead>
            <tr>
              <th colSpan="2">Additional Information</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td width="10%"><b>Dimensions </b></td>
              <td>40 MM X 30MM</td>
            </tr>
            <tr>
              <td><b>Weight</b></td>
              <td>1 Gram, 3.5 Grams, 7 Grams, 14 Grams, 28 Grams</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  )
}
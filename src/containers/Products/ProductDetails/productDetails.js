import React from 'react';
import Button from '@material-ui/core/Button';

export default (props) => {
  return (
    <div className="productDetails-container">
      <div className="detailsContent">
        <div className="imageContent">
          <div className="mainImage">
            <img className="img-responsive" src={(props.detail.itemInfo.images && props.detail.itemInfo.images[0].url) || 'https://www.coghlans.com/images/products/products-camp-kitchen-thumb.jpg'} alt={props.detail.itemInfo.itemName} />
          </div>
          <div className="subImages">
            {props.detail.itemInfo.images && props.detail.itemInfo.images.map((image, key) => (
              <img key={key} className="img-responsive" src={image.url || "https://www.coghlans.com/images/products/products-camp-kitchen-thumb.jpg"} alt={props.detail.itemInfo.itemName} />
            ))}
          </div>
        </div>
        <div className="descriptionContent">
          <div className="namePriceDiv">
            <h3>{props.detail.itemInfo.itemName}</h3>
            <h4>Item Code: {props.detail.itemInfo.itemNo}</h4>
            <h4>Unit Count: {props.detail.itemInfo.unitCount}</h4>
            <h3>{props.detail.itemInfo.currency.code} {props.detail.itemInfo.price}</h3>
            <p>{props.detail.itemInfo.itemDesc}
            </p>
          </div>
          <div className="addToCartButtonDiv">
            <Button variant="contained" size='large' color="inherit" classes={{ root: 'add-cart-button' }} onClick={() => props.addToCart()}>ADD TO CART</Button>
            <Button variant="contained" size='large' color="inherit" classes={{ root: 'buy-cart-button' }} onClick={() => props.buyProduct()}>BUY NOW</Button>
          </div>
        </div>
      </div>
    </div>
  )
}
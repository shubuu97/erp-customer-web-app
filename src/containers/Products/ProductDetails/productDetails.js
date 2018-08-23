import React from 'react';
import Button from '@material-ui/core/Button';

export default (props) => {
  return (
    <div className="productDetails-container">
      <div className="detailsContent">
        <div className="imageContent">
          <div className="mainImage">
            <img className="img-responsive" src="https://www.coghlans.com/images/products/products-camp-kitchen-thumb.jpg" alt="pro-image" />
          </div>
          <div className="subImages">
          <img className="img-responsive" src="https://www.coghlans.com/images/products/products-camp-kitchen-thumb.jpg" alt="pro-image" />
          <img className="img-responsive" src="https://www.coghlans.com/images/products/products-camp-kitchen-thumb.jpg" alt="pro-image" />
          <img className="img-responsive" src="https://www.coghlans.com/images/products/products-camp-kitchen-thumb.jpg" alt="pro-image" />
          </div>
        </div>
        <div className="descriptionContent">
          <div className="namePriceDiv">
              <h3>Hot Case</h3>
              <h4>Item Code: Sku-item123</h4>
              <h3>USD 500</h3>
              <p>This is the desciption of product This is the desciption of product This is the desciption of product
              This is the desciption of product This is the desciption of product This is the desciption of product
              This is the desciption of product This is the desciption of product This is the desciption of product 
              This is the desciption of product This is the desciption of product This is the desciption of product
              This is the desciption of product This is the desciption of product This is the desciption of product 
              This is the desciption of product This is the desciption of product
              This is the desciption of product This is the desciption of product This is the desciption of product
              </p>
          </div>
          <div className="addToCartButtonDiv">
          <Button variant="contained" size='large' color="inherit" classes={{root: 'add-cart-button'}} onClick={() => props.addToCart()}>ADD TO CART</Button>
          <Button variant="contained" size='large' color="inherit" classes={{root: 'buy-cart-button'}} onClick={() => props.buyProduct()}>BUY NOW</Button>
          </div>
        </div>
      </div>
    </div>
  )
}
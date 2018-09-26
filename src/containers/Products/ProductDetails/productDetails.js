import React from 'react';
import Button from '@material-ui/core/Button';
import productPlaceholder from '../../../assets/images/product-image-placeholder.jpg';
import _get from 'lodash/get';
import Select from 'react-select';
import ReactImageMagnify from 'react-image-magnify';
const productDetails = (props) => {
  return (
    <div className="productDetails-container container">
      <ul className="breadcrumb">
        <li>Home</li>
        <li>{props.selectedCategory}</li>
        <li onClick={props.gotoList}>{props.selectedCategoryType.itemType || ''}</li>
        <li>{props.detail.aliasName || props.detail.itemName}</li>
      </ul>
      <div className="detailsContent">
        <div className="imageContent">
          <div className="mainImage">
          <ReactImageMagnify enlargedImagePosition='over'  {...{
                smallImage: {
                    alt: props.detail.itemName,
                    isFluidWidth: true,
                    src: props.mainImageUrl.url
                },
                largeImage: {
                    src: props.mainImageUrl.url,
                    width: 1200,
                    height: 1800
                }
            }} />
            {/* <img className="img-responsive" src={props.mainImageUrl.url} alt={props.detail.itemName} /> */}
          </div>
          <div className="subImages">
            {props.detail.images && props.detail.images.map((image, key) => (
              <img key={key} onClick={() => props.updateMainImage(image)} className={`img-responsive ${props.mainImageUrl.url == image.url ? 'active' : ''}`} src={image.url || productPlaceholder} alt={props.detail.itemName} />
            ))}
          </div>
        </div>
        <div className="descriptionContent">
          <div className="namePriceDiv">
            <h2 className="p-name">{props.detail.aliasName || props.detail.itemName}</h2>
            <p className="ic text-uppercase">Item Code: <span>{props.detail.itemNo}</span></p>


            {/* <p className="ic">Unit Count: <span>{props.detail.unitCount}</span></p> */}
            <div className="price-text-css">
              <h3 className="p-price">$ {props.updatedPrice || (props.detail.basePrice && props.detail.basePrice.price)}</h3><p>Per {props.selectedWeight.label || ((props.detail.basePrice && props.detail.basePrice.unitCount) + ' ' +(props.detail.primaryUomCode && props.detail.primaryUomCode.name) || 'Grams')}</p>
            </div>
            <div className="d-flex wq-bar">
              <label>Weight</label>
              {/* <Select
                name={'weight'}
                placeholder='Weight'
                className="product-weight-select"
                value={props.selectedWeight || _get(props, 'detail.priceDetails', []).map((price)=>({value: price.price, label: price.unitCount + ' ' + ((props.detail.primaryUomCode && props.detail.primaryUomCode.name) || 'Grams')}))[0]}
                options={_get(props, 'detail.priceDetails', []).map((price)=>({value: price.price, label: price.unitCount + ' ' + ((props.detail.primaryUomCode && props.detail.primaryUomCode.name) || 'Grams')}))}
                onChange={props.weightChanger}
              /> */}
              <select className="form-control product-weight-select" onChange={(e)=>props.weightChanger(e.target.selectedIndex, props.detail)}>
              {_get(props, 'detail.priceDetails', []).map((price)=>(
                <option value={price.price} label={price.unitCount + ' ' + ((props.detail.primaryUomCode && props.detail.primaryUomCode.name) || 'Grams')}>{price.unitCount + ' ' + ((props.detail.primaryUomCode && props.detail.primaryUomCode.name) || 'Grams')}</option>
              ))}
              </select>
              {/* <span>{props.detail.unitCount}  */}
              {/* <span> {(props.detail.primaryUomCode && props.detail.primaryUomCode.name) || 'Grams'}</span> */}

            </div>
            <div className="d-flex wq-bar align-center">
              <label>Quantity</label>
              <div className="row-quantity">
                <div className="d-flex">
                  <button onClick={() => props.updateQuantity('sub')}>-</button>
                  <div className="row-quantity-item">{props.detail.quantity}</div>
                  <button onClick={() => props.updateQuantity('add')}>+</button></div>
              </div>
            </div>
            {/* <div className="d-flex wq-bar">
              <label className="cart-stock"><i className="fa fa-check"></i> &nbsp;In Stock</label>
            </div> */}
          </div>
          <div className="addToCartButtonDiv">
            <Button variant="contained" size='large' color="primary" classes={{ root: 'add-cart-button' }} onClick={() => props.addToCart()}>ADD TO CART</Button>
            {/* <Button variant="contained" size='large' color="inherit" classes={{ root: 'buy-cart-button' }} onClick={() => props.buyProduct()}>BUY NOW</Button> */}
            <p className="p-desc"><b>Description</b>{_get(props,'detail.itemDesc','No Description Available')} </p>
          </div>
        </div>
      </div>
      {/* For FURTURE ADDITIONAL INFORMATION */}
      {/* <div className="table-responsive table-product-detail">
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
      </div> */}
    </div>
  )
}

export default productDetails;
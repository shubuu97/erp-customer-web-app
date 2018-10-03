import React from 'react';
import trash from './../../../assets/images/delete-button.png';
import cartedit from './../../../assets/images/edit.png';
import _get from 'lodash/get';
import Select from 'react-select';

export default (props) => {
  return (
    <div className="row-container">
      <div className="row-product" data-title="Product Name">

        <img className="row-product-img" src={props.image} alt={props.name} />
        <div className="row-name-code">
          <h4>{props.name}</h4>
          {/* <h4>{props.code}</h4> */}
        </div>
      </div>
      <div className="row-price" data-title="Price">
        {/* <Select
          name={'weight'}
          placeholder='Weight'
          className="product-weight-select"
          value={props.weight}
          options={_get(props, 'detail.priceDetails', []).map((price) => ({ value: price.price, label: price.unitCount + ' ' + ((props.detail.primaryUomCode && props.detail.primaryUomCode.name) || 'Grams') }))}
          onChange={(val)=> props.weightChanger(val, props.id)}
        /> */}
        <select className="form-control product-weight-select" value={props.weight.value}  onChange={(e)=>props.weightChanger(e.target.selectedIndex, props.detail, props.id)}>
          {_get(props, 'detail.priceDetails', []).map((price)=>(
            <option value={price.price}>{price.unitCount + ' ' + ((props.detail.primaryUomCode && props.detail.primaryUomCode.name) || 'Grams')}</option>
          ))}
        </select>
      </div>
      <div className="row-price" data-title="Price">
        <h4>{props.currency} {props.price}</h4>
      </div>
      <div className="row-quantity" data-title="Quantity">
        <div className="d-flex">
          <button title="Decrease" onClick={() => props.updateQuantity(props.id, 'sub')}>-</button>
          <div className="row-quantity-item">{props.quantity}</div>
          <button title="Increase" onClick={() => props.updateQuantity(props.id, 'add')}>+</button>
        </div>
      </div>
      <div className="row-total" data-title="Sub Total">
        <div className="d-flex justify-content-between">
          <h4>{props.currency} {props.total || props.price || '0'}</h4>
          {/* <img src={cartedit} onClick={()=>{}}/> */}
         <span className="cart-remove" title="Delete"> <img src={trash} onClick={() => props.remove(props.id)} /> </span>
        </div>
      </div>

    </div>
  )
}
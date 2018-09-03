import React from 'react';
import trash from './../../../../assets/images/delete-button.png';
import cartedit from './../../../../assets/images/edit.png';

export default (props) => {

    console.log(props,"props is here")
  return (
    <div className="">
      <div className="">
        
        <img className="row-product-img" src={props.image} alt={props.name} />
        <div className="">
          <h4>{props.name}</h4>
          {/* <h4>{props.code}</h4> */}
        </div>
      </div>
      <div className="">
        <h4>{props.price}</h4>
      </div>
      <div className="">
        <div className="">
        <input type="textbox"
        value = {props.quantity}
        onChange={(e)=>props.updateQuantity(props.id,e.target.value)}
        />
        </div>
      </div>
      <div className="">
        <h4>{props.total || props.price || '0'}</h4>
      </div>
      <div className="">
      <img src={cartedit} />
      <img src={trash} onClick={()=>props.remove(props.id)}/>
      </div>
    </div>
  )
}
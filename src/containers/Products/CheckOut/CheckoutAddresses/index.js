import React from 'react';
import Button from '@material-ui/core/Button';
import BillingAddress from './BillingAddress';
import ShippingAddress from './ShippingAddress'
import addressEdit from '../../../../assets/images/edit.png';
import checkGreen from '../../../../assets/images/check-green.jpg';

 const  checkoutAddress =  (props) => {

 let address = 
 
 props.address.map((address,index)=>
{
return (
  <div key={index} onClick={()=>props.addressSelect(index)} className="address-detail selected">
  <h5>{props.name}</h5>
  <p>{address.companyAddress || address.address}, {address.city}, {address.state}, {address.country}- {address.zipCode}</p>
  <img src={index==props.selectedAddress?checkGreen:null}  className="address-select-img" />
  <img src={addressEdit} className="address-edit-img" />
</div>
)
})

  return (
    <div  className="billing-address">
      <div className="biling-address-title">
        <h4> {props.type}</h4>
      </div>
      <div className="address-content">
       {address}
        <div className="addToCartButtonDiv">
          {props.type=="Billing Address"?<BillingAddress/>:<ShippingAddress/>}
        </div>
      </div>
      

    </div>)
}

export default checkoutAddress;
import React from 'react';
// import withLoader from '../../../components/LoaderHoc';
import addressEdit from '../../../assets/images/edit.png';
import checkGreen from '../../../assets/images/check-green.jpg';


const displayAddress = (props) => {
    let addType = ''
    if(props.addressType === 'shipping') {
        addType = "Shipping Address"
    } else if(props.addressType === 'billing') {
        addType = "Billing Address"
    }
    return (
        <div>
            <div className="address-detail selected">                
                <h5>{props.fullName}</h5>
                <p>{props.address}, {props.city}, {props.state}, {props.country}, {props.zip}</p>
                <img src={checkGreen}  className="address-select-img" />
                <img  src={addressEdit} className="address-edit-img" />     
                <img  src={addressEdit} className="address-edit-img" />       
            </div>
        </div>
    )
}

export default displayAddress;
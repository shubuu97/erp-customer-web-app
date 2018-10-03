import React from 'react';
// import withLoader from '../../../components/LoaderHoc';
import addressEdit from '../../../assets/images/edit.png';
import addressDelete from '../../../assets/images/delete-button.png';
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
                <div className="address-custom">
                    <img  src={addressEdit} className="address-edit-img" />     
                    <img  src={addressDelete} className="address-edit-img" onClick={()=>props.deleteHandler(props.index,props.addressType)} />
                </div>   
            </div>
        </div>
    )
}

export default displayAddress;
import React from 'react';
import addressEdit from '../../../assets/images/edit.png';
import checkGreen from '../../../assets/images/check-green.jpg';


const displayAddress = (props) => {
    return (
        <div>
            <div onClick={()=>props.setPrimary(props.details)} className={`address-detail ${props.showGreenCheck ? 'selected' : ''}`} >                
                <h5>{props.fullName}</h5>
                <p>{props.address}, {props.city}, {props.state}, {props.country}, {props.zip}</p>
                <img src={checkGreen}  className="address-select-img" />
                <img  src={addressEdit} className="address-edit-img" />            
            </div>
        </div>
    )
}

export default displayAddress;
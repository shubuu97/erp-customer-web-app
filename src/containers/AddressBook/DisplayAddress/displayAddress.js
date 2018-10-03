import React from 'react';
import addressEdit from '../../../assets/images/edit.png';
import checkGreen from '../../../assets/images/check-green.jpg';


const displayAddress = (props) => {
    return (
        <div>
            <div className={`address-detail ${props.showGreenCheck ? 'selected' : ''}`} >                
                <h5>{props.fullName}</h5>
                <p>{props.address}, {props.city}, {props.state}, {props.country}, {props.zip}</p>
                <img alt="address checkbox" onClick={()=>props.setPrimary(props.details)} src={checkGreen} className="address-select-img" />
                <img alt="address edit" src={addressEdit} className="address-edit-img" />            
            </div>
        </div>
    )
}

export default displayAddress;
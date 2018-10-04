import React from 'react';
import addressEdit from '../../../assets/images/edit.png';
import addressDelete from '../../../assets/images/delete-button.png';
import checkGreen from '../../../assets/images/check-green.jpg';


const displayAddress = (props) => {
    return (
        <div>
            <div className={`address-detail ${props.showGreenCheck ? 'selected' : ''}`} >                
                <h5>{props.fullName}</h5>
                <p>{props.address}, {props.city}, {props.state}, {props.country}, {props.zip}</p>
               <img title="Set Primary"alt="address checkbox" onClick={()=>props.setPrimary(props.details)} src={checkGreen} className="address-select-img" />
                <div className="address-custom">
                <img title='Edit' onClick={()=>props.handleEdit(props.addressType,props.index)}  src={addressEdit} className="address-edit-img" />     
                    <img title='Delete' src={addressDelete} className="address-edit-img" onClick={()=>props.deleteHandler(props.index,props.addressType)} />
                </div>   
            </div>
        </div>
    )
}

export default displayAddress;
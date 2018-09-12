import React from 'react';
import { array } from 'prop-types';


const accountView =  (props)=>
{
let AddressInfo ;   
if(Array.isArray(props.addressInfo))
{
    AddressInfo =   props.addressInfo.map((address)=>
{
    return( <div className="ac-box">
       <div className="ac-main-inner">{address.address}, </div>
       <div className="ac-main-inner">{address.city}, {address.state}, {address.zipCode},</div>
       <div className="ac-main-inner">{address.country}</div>
    </div>)
})
}
else{
    AddressInfo = null
}
    return(
    <div>
        <div className="ac-main">{props.firstName} {props.lastName}</div>
        <div className="ac-main"> {AddressInfo}</div>
        <div className="ac-secondary-box">
            <div className="ac-main"><label>Email:</label> {props.email}</div>
            <div className="ac-main"><label>Contact Number:</label> {props.contactNumber}</div>
            <div className="ac-main"><label>License Number:</label> {props.licenseNumber}</div>         
        </div>
    </div>
    )
}

export default accountView

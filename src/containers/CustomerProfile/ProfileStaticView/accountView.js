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
       {localStorage.getItem('role')=='customer' ? <div className="ac-main"> {AddressInfo}</div>:null}
        <div className={localStorage.getItem("role")=="customer"?"ac-secondary-box":null}>
        {localStorage.getItem('role')=="company"?  <div className="ac-main"><label>Company Name:</label> {props.companyName}</div>:null}
            <div className="ac-main"><label>Email:</label> {props.email}</div>
            {localStorage.getItem('role')=="company"?  <div className="ac-main"><label>Designation:</label> {props.designation}</div>:null}

           {localStorage.getItem('role')=='customer' ?<div className="ac-main"><label>Contact Number:</label> {props.contactNumber}</div>:null}
           {localStorage.getItem('role')=='customer' ?<div className="ac-main"><label>License Number:</label> {props.licenseNumber}</div>:null}        
        </div>
    </div>
    )
}

export default accountView

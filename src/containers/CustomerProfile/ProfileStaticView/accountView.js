import React from 'react';
import { array } from 'prop-types';
import Card from '@material-ui/core/Card';


const accountView =  (props)=>
{
let AddressInfo ;   
if(Array.isArray(props.addressInfo))
{
    AddressInfo =   props.addressInfo.map((address)=>
{
    return( <div>
       <div>Address -  {address.address}</div>
       <div>Zip Code -{address.zipCode}</div>
        <div>City-{address.city}</div>
        <div>State-{address.state}</div>
        <div>Country-{address.country}</div>
    </div>)
})
}
else{
    AddressInfo = null
}
    return(
    <Card>
        <div>First Name- {props.firstName}</div>
        <div>Last Name - {props.lastName}</div>
        <div>Email- {props.email}</div>
        <div>Contact Number- {props.contactNumber}</div>
        <div>License Number- {props.licenseNumber}</div>
         <div>Address Info- {AddressInfo}</div>
    </Card>
    )
}

export default accountView

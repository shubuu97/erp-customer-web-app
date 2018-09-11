import React from 'react';
import Card from '@material-ui/core/Card';
import _get from     'lodash/get'


const LicenseView =  (props)=>
{
     let AddressInfo ;   ;  
if(props.companyAddress)
{
    AddressInfo =   
     <div>
       <div>Address -  {_get(props.companyAddress,'companyAddress','')}</div>
       <div>Zip Code -{_get(props.companyAddress,'zipCode','')}</div>
        <div>City-{_get(props.companyAddress,'city','')}</div>
        <div>State-{_get(props.companyAddress,'state','')}</div>
        <div>Country-{_get(props.companyAddress,'country','')}</div>
    </div>
 }
 else{
      
        AddressInfo = null
}
let Contacts
if(Array.isArray(props.contactNumbers))
{
    Contacts=props.contactNumbers.map((contact)=>
{
    return( <div>
        <div>  {contact.contact}</div>
        
     </div>)
 
})
}
else{
    Contacts= null
}
let Email
if(Array.isArray(props.emailAddresses))
{
    Email=props.emailAddresses.map((email)=>
{
    return( <div>
        <div>Email Address -  {email.email}</div>
        
     </div>)
 
})
}
else{
    Email= null
}

    return(
    <Card>
          <div>Company Name - {props.companyName}</div>
        <div>License Number - {props.licenseNumber}</div>
        <div>License Type - {props.licenseType}</div>
        <div>Address - {AddressInfo}</div>
       <div> Contacts - {Contacts}</div>
       <div> Email Addresses - {Email}</div>


    </Card>
    )
}


export default LicenseView
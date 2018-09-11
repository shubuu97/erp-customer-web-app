import React from 'react';
import _get from     'lodash/get'


const LicenseView =  (props)=>
{
     let AddressInfo ;   ;  
if(props.companyAddress)
{
    AddressInfo =   
    <div className="col-sm-12 form-d plr-0">
        <div className="alt-accounts">
        <div className="row"><div className="col-xs-5 ac-main"><label>Address:</label></div> <div className="col-xs-7 ac-main">{_get(props.companyAddress,'companyAddress','')}</div></div>
        <div className="row"><div className="col-xs-5 ac-main"><label>Zip Code :</label></div> <div className="col-xs-7 ac-main">{_get(props.companyAddress,'zipCode','')}</div></div>
        <div className="row"><div className="col-xs-5 ac-main"><label>City:</label></div> <div className="col-xs-7 ac-main">{_get(props.companyAddress,'city','')}</div></div>
        <div className="row"><div className="col-xs-5 ac-main"><label>State:</label></div> <div className="col-xs-7 ac-main">{_get(props.companyAddress,'state','')}</div></div>
        <div className="row"><div className="col-xs-5 ac-main"><label>Country:</label></div> <div className="col-xs-7 ac-main">{_get(props.companyAddress,'country','')}</div></div>
        </div>
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
    <div>
          <div className="row"><div className="col-xs-5 ac-main"><label>Company Name:</label></div> <div className="col-xs-7 ac-main">{props.companyName}</div></div>
          <div className="row"><div className="col-xs-5 ac-main"><label>License Number:</label></div> <div className="col-xs-7 ac-main">{props.licenseNumber}</div></div>
          <div className="row"><div className="col-xs-5 ac-main"><label>License Type:</label></div> <div className="col-xs-7 ac-main">{props.licenseType}</div></div>
          <div className="row ac-secondary-box d-flex mlr-0"><div className="col-xs-12 plr-0"><label className="s-title">Address:</label></div> <div className="d-flex">{AddressInfo}</div></div>
          <div className="row"><div className="col-xs-5 ac-main"><label> Email:</label></div> <div className="col-xs-7 ac-main"> {Email}</div></div>
          <div className="row"><div className="col-xs-5 ac-main"><label> Contacts:</label></div> <div className="col-xs-7 ac-main">{Contacts}</div></div>
    </div>
    )
}


export default LicenseView
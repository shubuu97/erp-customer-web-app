import React from 'react';
import _get from     'lodash/get'


const SiteLicense = (props)=>
{
let licenseDetails
if(Array.isArray(props.siteLicense))
{
    licenseDetails = props.siteLicense.map((license)=>
{
    return (<div>
        <div className="row"><div className="col-xs-6 ac-main"><label>License Number:</label></div> <div className="col-xs-6 ac-main"> {_get(license,'licenseNumber','')}</div></div>
    
        </div>
    )
})
}
else 
{
    licenseDetails = null;
}
return (
  <div>  {licenseDetails} </div>
)
}
const AddressInfo = (props)=>
{
let addressDetails
if(Array.isArray(props.addressInfo))
{
    addressDetails = props.addressInfo.map((address)=>
{
    return (<div className="form-d">
        
        <div className="ac-main">{_get(address,'siteAddress','')}</div>
        <div className="ac-main">{_get(address,'city','')}, {_get(address,'state','')} {_get(address,'zipCode','')}, <br />{_get(address,'country','')}</div>
        <div className="ac-main">{_get(address,'email','')} </div>
        <div className="ac-main">{_get(address,'contactNumber','')} </div>
        </div>
    )
})
}

else 
{
    addressDetails = null;
}
return (
    <div className="site-box"><div><label className="s-title">Site Address-</label></div>{addressDetails}</div>
)
}


const SiteView =  (props)=>
{
     let SiteInfo ;
if(Array.isArray(props.siteDetails))
{
    SiteInfo =   props.siteDetails.map((site)=>
    {
        return(
    
     <div>
        <div className="row"><div className="col-xs-6 ac-main"><label> Site Name:</label></div> <div className="col-xs-6 ac-main">{_get(site,'siteName','')}</div></div>
        <div className="row"><div className="col-xs-6 ac-main"><label>License Type:</label></div> <div className="col-xs-6 ac-main">{_get(site,'licenseType','')}</div></div>
        <SiteLicense siteLicense ={site.siteLicense}/>
        <AddressInfo addressInfo = {site.addressInfo}/>
    </div>)
 })
}
 else{
      
        SiteInfo = null
}


    return(
    <div>
          <div>{SiteInfo}</div>


    </div>
    )
}


export default SiteView
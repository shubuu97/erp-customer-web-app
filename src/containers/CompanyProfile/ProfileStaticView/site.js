import React from 'react';
import Card from '@material-ui/core/Card';
import _get from     'lodash/get'


const SiteLicense = (props)=>
{
let licenseDetails
if(Array.isArray(props.siteLicense))
{
    licenseDetails = props.siteLicense.map((license)=>
{
    return (<div>
        <div>License Number- {_get(license,'licenseNumber','')}</div>
    
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
    return (<div>
        <div>Site Address- {_get(address,'siteAddress','')}</div>
        <div>Zip Code-{_get(address,'zipCode','')}</div>
        <div>Country-{_get(address,'country','')} </div>
        <div>State-{_get(address,'state','')} </div>
        <div>city-{_get(address,'city','')} </div>
        <div>Email -{_get(address,'email','')} </div>
        <div>Contact Number-{_get(address,'contactNumber','')} </div>
        </div>
    )
})
}

else 
{
    addressDetails = null;
}
return (
    <div>{addressDetails}</div>
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
       <div> Site Name-  {_get(site,'siteName','')}</div>
       <div>License Type- {_get(site,'licenseType','')}</div> 
        <AddressInfo addressInfo = {site.addressInfo}/>
         <SiteLicense siteLicense ={site.siteLicense}/>
    </div>)
 })
}
 else{
      
        SiteInfo = null
}


    return(
    <Card>
          <div>{SiteInfo}</div>


    </Card>
    )
}


export default SiteView
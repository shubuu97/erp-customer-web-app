import {TextFieldInput,SelectFieldInput} from '../../../components/common/MaterialUiComponents';


let SiteInfo = [
    {
     name:'siteName',label:'Site Name',component:TextFieldInput,type:'text'
    },
    {
        name:'siteLicenceType',label:'Site Licence Type',component:SelectFieldInput,type:'select'
       },
       {
        name:'licenceNumber',label:'Licence Number',component:TextFieldInput,type:'text'
       },
       {
        name:'siteLicenceNo',label:'Site Licence Number',component:SelectFieldInput,type:'select'
       },
       {
        name:'companySiteAddress',label:'Company Site Address',component:TextFieldInput,type:'text'
       },
       {
        name:'EmailAddress',label:'Email Address',component:TextFieldInput,type:'text'
       },
       {
        name:'siteContactNo',label:'Site Contact No',component:TextFieldInput,type:'text'
       },
       {
           name:'country',label:'Country',component:SelectFieldInput,type:'select'
          },
          {
           name:'state',label:'state',component:SelectFieldInput,type:'select'
          },
          {
           name:'city',label:'City',component:SelectFieldInput,type:'select'
          },
          {
           name:'zipCode',label:'Zip Code',component:TextFieldInput,type:'text'
          },
          {
            name:'parentOrganizationName',label:'Parent Organization Name',component:TextFieldInput,type:'text'
           },
           {
            name:'parentOrganizationAddress',label:'Parent Organization Address',component:TextFieldInput,type:'text'
           },
           {
            name:'country',label:'Country',component:SelectFieldInput,type:'select'
           },
           {
            name:'state',label:'state',component:SelectFieldInput,type:'select'
           },
           {
            name:'city',label:'City',component:SelectFieldInput,type:'select'
           },
           {
            name:'zipCode',label:'Zip Code',component:TextFieldInput,type:'text'
           },
          

]
export default SiteInfo ;
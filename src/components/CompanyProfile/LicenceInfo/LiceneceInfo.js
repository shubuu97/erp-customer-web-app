import {TextFieldInput,SelectFieldInput,ReactSelectWrapper} from '../../../components/common/MaterialUiComponents';


let LicenceInfo = [
    {
     name:'companyName',label:'Company Name',component:TextFieldInput,type:'text'
    },
    {
        name:'licenceType',label:'Licence Type',component:ReactSelectWrapper,type:'select'
       },
       {
        name:'licenceNumber',label:'Licence Number',component:TextFieldInput,type:'text'
       },
       {
        name:'companyCategory',label:'Company Category',component:ReactSelectWrapper,type:'select'
       },
       {
        name:'companyStreetAddress',label:'Company Street Address',component:TextFieldInput,type:'text'
       },
       {
        name:'companyEmailAddress',label:'Company Email Address',component:TextFieldInput,type:'text'
       },
       {
        name:'companyContactNo',label:'Company Contact No',component:TextFieldInput,type:'text'
       },
       {
           name:'country',label:'Country',component:ReactSelectWrapper,type:'select'
          },
          {
           name:'state',label:'state',component:ReactSelectWrapper,type:'select'
          },
          {
           name:'city',label:'City',component:ReactSelectWrapper,type:'select'
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
            name:'country',label:'Country',component:ReactSelectWrapper,type:'select'
           },
           {
            name:'state',label:'state',component:ReactSelectWrapper,type:'select'
           },
           {
            name:'city',label:'City',component:ReactSelectWrapper,type:'select'
           },
           {
            name:'zipCode',label:'Zip Code',component:TextFieldInput,type:'text'
           },
          

]
export default LicenceInfo ;
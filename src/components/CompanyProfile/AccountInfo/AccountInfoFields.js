import {TextFieldInput} from '../../../components/common/MaterialUiComponents'

let AccountInfo = [
    {
     name:'companyName',label:'Company Name <em>*</em>',component:TextFieldInput,type:'text'
    },
    {
        name:'firstName',label:'First Name <em>*</em>',component:TextFieldInput,type:'text'
       },
       {
        name:'middleName',label:'Middle Name',component:TextFieldInput,type:'text'
       },
       {
        name:'lastName',label:'Last Name <em>*</em>',component:TextFieldInput,type:'text'
       },
       {
        name:'officialEmailAddress',label:'Email Address <em>*</em>',component:TextFieldInput,type:'text'
       },
       {
        name:'designation',label:'Designation <em>*</em>',component:TextFieldInput,type:'text'
       }
]

export default AccountInfo;
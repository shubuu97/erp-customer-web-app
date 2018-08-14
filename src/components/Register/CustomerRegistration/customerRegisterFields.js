import { SelectFieldInput,TextFieldInput} from '../../common/MaterialUiComponents';

let basicInfo = [

    { name: 'firstName', label: 'First Name', component: TextFieldInput,type:'text' },
    { name: 'middleName', label: 'Middle Name', component: TextFieldInput ,type:'text'},
    { name: 'lastName', label: 'Last Name', component: TextFieldInput ,type:'text'},
    { name: 'email', label: 'Email Id', component: TextFieldInput ,type:'text'},


]

let addressInfo = [
    { name: 'address', label: 'Location Address', component: TextFieldInput,type:'text' },
    { name: 'country', label: 'Country', component: SelectFieldInput,type:'select' },
    { name: 'state', label: 'State', component:SelectFieldInput ,type:'select'},
    {name: 'city', label: 'City', component: SelectFieldInput,type:'select' },
    {name :'zipCode', label:'Zip Code', component:TextFieldInput,type:'text'}
]

export  {basicInfo,addressInfo};
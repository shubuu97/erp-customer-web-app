import { SelectFieldInput,TextFieldInput} from '../MaterialUiComponents';

let addressInfo = [
    { name: 'address', label: 'Location Address', component: TextFieldInput,type:'text' },
    { name: 'country', label: 'Country', component: SelectFieldInput,type:'select' },
    { name: 'state', label: 'State', component:SelectFieldInput ,type:'select'},
    {name: 'city', label: 'City', component: SelectFieldInput,type:'select' },
    {name :'zipCode', label:'Zip Code', component:TextFieldInput,type:'text'}
]

export default addressInfo
import { ReactSelectWrapper,TextFieldInput} from '../MaterialUiComponents';

let addressInfo = [
    { name: 'address', label: 'Location Address', component: TextFieldInput,type:'text' },
    { name: 'country', label: 'Country', component: ReactSelectWrapper,type:'text' },
    { name: 'state', label: 'State', component:ReactSelectWrapper ,type:'text'},
    {name: 'city', label: 'City', component: ReactSelectWrapper,type:'text' },
    {name :'zipCode', label:'Zip Code', component:TextFieldInput,type:'text'}
]

export default addressInfo
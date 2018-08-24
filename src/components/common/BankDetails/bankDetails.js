import { SelectFieldInput,TextFieldInput} from '../MaterialUiComponents';

let bankDetails = [
    {name:'accountName',label:'Account Name', component:TextFieldInput,type:'text'},
    { name: 'bankName', label: 'Bank Name', component: TextFieldInput,type:'text' },
    { name: 'branchName', label: 'Bank Branch', component: TextFieldInput ,type:'text'},
    { name: 'bankRoutingNumber', label: 'Bank Routing No.', component: TextFieldInput ,type:'text'},
    { name: 'bankAccountNumber', label: 'Bank Account No.', component: TextFieldInput ,type:'text'},
    { name: 'bankBranch', label: 'Bank Branch', component: TextFieldInput ,type:'text'},
    { name: 'bankNumber', label: 'Bank Number', component: TextFieldInput ,type:'text'},
    { name: 'accountStatus', label: 'Account Status', component: TextFieldInput ,type:'text'},
    
    {name: 'effectiveFrom', label:'Effective From', component:TextFieldInput,tyoe:'text'}



]

export default bankDetails;
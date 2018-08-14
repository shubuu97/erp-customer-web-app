import {TextFieldInput,SelectFieldInput} from '../../../components/common/MaterialUiComponents';


let CustomerBankInfo = [
    {
     name:'accountNo',label:'Account No',component:TextFieldInput,type:'text'
    },
    {
        name:'creditLimit',label:'Credit Limit',component:TextFieldInput,type:'text'
       },
       
       {
        name:'printNameOnCheck',label:'Print Name On Check As',component:TextFieldInput,type:'text'
       },
       {
        name:'invoiceCurrency',label:'Invoice Currency',component:SelectFieldInput,type:'select'
       },
       {
        name:'currencyCode',label:'CurrencyCode',component:TextFieldInput,type:'text'
       },
       {
        name:'uploadVoidCheck',label:'Upload Void Check',component:TextFieldInput,type:'text'
       }
]

export default CustomerBankInfo  ;
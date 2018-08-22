import {TextFieldInput,ReactSelectWrapper} from '../../../components/common/MaterialUiComponents';


let CustomerBankInfo = [
    {
     name:'accountNumber',label:'Account No',component:TextFieldInput,type:'text'
    },
    {
        name:'creditLimit',label:'Credit Limit',component:TextFieldInput,type:'text'
       },
       
       {
        name:'nameOnCheque',label:'Print Name On Check As',component:TextFieldInput,type:'text'
       },
       {
        name:'invoiceCurrencyCode',label:'Invoice Currency',component:ReactSelectWrapper,type:'select'
       },
       {
        name:'currencyCode',label:'CurrencyCode',component:TextFieldInput,type:'text'
       },
       {
        name:'uploadVoidCheck',label:'Upload Void Check',component:TextFieldInput,type:'text'
       }
]

export default CustomerBankInfo  ;
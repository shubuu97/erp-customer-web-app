import {TextFieldInput,SelectFieldInput} from '../../../components/common/MaterialUiComponents';


let CompanyBankInfo = [
    {
     name:'accountNo',label:'Account No',component:TextFieldInput,type:'text'
    },
    {
        name:'creditLimit',label:'Credit Limit',component:TextFieldInput,type:'text'
       },
       {
        name:'paymentTerms',label:'Payment Terms',component:SelectFieldInput,type:'select'
       },
       {
        name:'invoiceCurrencyCode',label:'Invoice Currency',component:TextFieldInput,type:'text'
       },
       {
        name:'printNameOnCheck',label:'Print Name On Check As',component:TextFieldInput,type:'text'
       },
       {
        name:'currencyCode',label:'CurrencyCode',component:TextFieldInput,type:'text'
       },
       {
        name:'preferredPaymentMethod',label:'Prefereed Payment Method',component:TextFieldInput,type:'text'
       },
       {
        name:'uploadVoidCheck',label:'Upload Void Check',component:TextFieldInput,type:'text'
       }
]

export default CompanyBankInfo  ;
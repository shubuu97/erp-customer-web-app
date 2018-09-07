import {TextFieldInput,ReactSelectWrapper,FileUpload} from '../../../components/common/MaterialUiComponents';


let CustomerBankInfo = [
    {
     name:'accountNumber',label:'Account No',component:TextFieldInput,type:'text'
    },
    {
        name:'creditLimit',label:'Credit Limit',component:TextFieldInput,type:'text'
       },
       {
        name:'paymentTerms',label:'Payment Terms',component:ReactSelectWrapper,type:'select'
       },
       {
        name:'nameOnCheque',label:'Print Name On Check As',component:TextFieldInput,type:'text'
       },
       {
        name:'invoiceCurrencyCode',label:'Invoice Currency',component:ReactSelectWrapper,type:'select'
       },
       {
        name:'currencyCode',label:'CurrencyCode',component:ReactSelectWrapper,type:'select'
       },
       {
        name:'preferredPaymentMethods',label:'Preferred Payment Method',component:ReactSelectWrapper,type:'select'
       },
       {
        name:'uploadVoidCheck',label:'Upload Void Check',component:FileUpload,type:'fileInput'
       }
]

export default CustomerBankInfo  ;
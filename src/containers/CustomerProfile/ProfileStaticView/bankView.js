import React from 'react';
import Card from '@material-ui/core/Card';


const bankView =  (props)=>
{
    let BankDetails ;   
if(Array.isArray(props.bankDetails))
{
    BankDetails =   props.bankDetails.map((bankDetail)=>
{
    return( <div>
       <div>Account Name -  {bankDetail.accountName}</div>
       <div>Account Status -{bankDetail.accountStatus}</div>
        <div>Bank Account Number-{bankDetail.bankAccountNumber}</div>
        <div>Bank Name-{bankDetail.bankName}</div>
        <div>Bank Routing Number-{bankDetail.bankRoutingNumber}</div>
        <div>Branch Name-{bankDetail.branchName}</div>
    </div>)
})
}
else{
    BankDetails = null
}
    return(
    <Card>
          <div>Account Number - {props.accountNumber}</div>
        <div>Credit Limit - {props.creditLimit}</div>
        <div>Currency Code - {props.currencyCode}</div>
        <div>Invoice Currency Code - {props.invoiceCurrencyCode}</div>
        <div>Name On Cheque - {props.nameOnCheque}</div>
        <div>Payment Terms - {props.paymentTerms}</div>
        <div>Preferred Payment Methods - {props.preferredPaymentMethods}</div>
        <div>Account Number - {props.accountNumber}</div>
        <div>Bank Details- {BankDetails}</div>

    </Card>
    )
}


export default bankView

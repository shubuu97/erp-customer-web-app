import React from 'react';
import Card from '@material-ui/core/Card';


const bankView =  (props)=>
{
    let BankDetails ;   
if(Array.isArray(props.bankDetails))
{
    BankDetails =   props.bankDetails.map((bankDetail)=>
{
    return( <div className="row">
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
    <div>
        <div className="row"><div className="col-xs-6 ac-main"><label>Company Account Number:</label></div> <div className="col-xs-6 ac-main">{props.accountNumber}</div></div>
        <div className="row"><div className="col-xs-6 ac-main"><label>Credit Limit:</label></div> <div className="col-xs-6 ac-main"> {props.creditLimit}</div></div>
        <div className="row"><div className="col-xs-6 ac-main"><label>Currency Code:</label></div> <div className="col-xs-6 ac-main"> {props.currencyCode}</div></div>
        <div className="row"><div className="col-xs-6 ac-main"><label>Invoice Currency Code:</label></div> <div className="col-xs-6 ac-main"> {props.invoiceCurrencyCode}</div></div>
        <div className="row"><div className="col-xs-6 ac-main"><label>Name On Cheque:</label></div> <div className="col-xs-6 ac-main"> {props.nameOnCheque}</div></div>
        <div className="row"><div className="col-xs-6 ac-main"><label>Payment Terms:</label> {props.paymentTerms}</div></div>
        <div className="row"><div className="col-xs-6 ac-main"><label>Preferred Payment Methods:</label></div> <div className="col-xs-6 ac-main"> {props.preferredPaymentMethods}</div></div>
        <div className="row"><div className="col-xs-6 ac-main"><label>Account Number:</label></div> <div className="col-xs-6 ac-main"> {props.accountNumber}</div></div>
        <div className="row"><div className="col-xs-6 ac-main"><label>Bank Details:</label></div> <div className="col-xs-6 ac-main"> {BankDetails}</div></div>

    </div>
    )
}


export default bankView

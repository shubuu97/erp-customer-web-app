import React from 'react';
import Card from '@material-ui/core/Card';


const bankView =  (props)=>
{
    let BankDetails ;   
if(Array.isArray(props.bankDetails))
{
    BankDetails =   props.bankDetails.map((bankDetail)=>
{
    return( <div className="col-lg-6 plr-0">
        <div className="alt-accounts">
            <div className="row"><div className="col-xs-6 ac-main"><label>Account Name:</label></div> <div className="col-xs-6 ac-main">  {bankDetail.accountName}</div></div>
            <div className="row"><div className="col-xs-6 ac-main"><label>Account Status:</label></div> <div className="col-xs-6 ac-main">{bankDetail.accountStatus}</div></div>
            <div className="row"><div className="col-xs-6 ac-main"><label>Bank Account Number:</label></div> <div className="col-xs-6 ac-main">{bankDetail.bankAccountNumber}</div></div>
            <div className="row"><div className="col-xs-6 ac-main"><label>Bank Name:</label></div> <div className="col-xs-6 ac-main">{bankDetail.bankName}</div></div>
            <div className="row"><div className="col-xs-6 ac-main"><label>Bank Routing Number:</label></div> <div className="col-xs-6 ac-main">{bankDetail.bankRoutingNumber}</div></div>
            <div className="row"><div className="col-xs-6 ac-main"><label>Branch Name:</label></div> <div className="col-xs-6 ac-main">{bankDetail.branchName}</div></div>
       </div>
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
        <div className="row ac-secondary-box d-flex mlr-0"><div className="col-xs-12 plr-0"><label className="s-title">Accounts Detail:</label></div> <div className="d-flex"> {BankDetails}</div></div>

    </div>
    )
}


export default bankView

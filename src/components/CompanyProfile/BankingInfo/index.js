import CompanyBankingDetails from './companyBankingDetails';
import { Field,reduxForm, FieldArray,FormSection } from 'redux-form';
import React, { Component } from 'react';
import { TextFieldInput,ReactSelectWrapper } from '../../common/MaterialUiComponents';
import Button from '@material-ui/core/Button';
import MenuItem from 'material-ui/MenuItem';
import BankDetailFields from '../../../components/common/BankDetails/bankDetails'
let prop={};
prop.paymentTerms = [{label:'FFF',value:'FFF'},{label:'AAA',value:'AAA'}];
prop.invoiceCurrencyCode=['INR','USD']

let BankDetailComponent = (props)=>
{
    const { fields, meta: { error } } = props;
    if(fields.length==0)
    fields.push();
    return (
        
           <div> {fields.map((field,index)=>

            (<div className="form-box">
            <div className="row d-flex">
            <div className="form-d col-md-4 col-sm-6 form-input">
                <Field name={`${field}.accountName`} label='Account Name' component={TextFieldInput} />
            </div>  
            <div className="form-d col-md-4 col-sm-6 form-input">
                <Field name={`${field}.bankName`} label='Bank Name' component={TextFieldInput} />
            </div>   
           
            <div className="form-d col-md-4 col-sm-6 form-input">
                <Field name={`${field}.branchName`} label='Bank Branch' component={TextFieldInput} />
            </div>   
            <div className="form-d col-md-4 col-sm-6 form-input">
                <Field name={`${field}.bankRoutingNumber`} label='Bank Routing No.' component={TextFieldInput} />
            </div>   
            <div className="form-d col-md-4 col-sm-6 form-input">
                <Field name={`${field}.bankAccountNumber`} label='Bank Account No.' component={TextFieldInput} />
            </div>   
            <div className="form-d col-md-4 col-sm-6 form-input">
                <Field name={`${field}.bankBranch`} label='Bank Branch' component={TextFieldInput} />
            </div>   
            <div className="form-d col-md-4 col-sm-6 form-input">
                <Field name={`${field}.bankNumber`} label='Bank Number' component={TextFieldInput} />
            </div>
            <div className="form-d col-md-4 col-sm-6 form-input">
                <Field name={`${field}.accountStatus`} label='Account Status' component={TextFieldInput} />
            </div>
        
                <div className="col-sm-12 form-btn-group-left"><Button variant="contained" color='primary' onClick={() => fields.push()}>Add new</Button></div>
                {fields.length!=1?<div className="col-sm-12 form-btn-group-left"><Button variant="contained" color='secondary' onClick={() => fields.remove(index)}>Remove</Button></div>:null}
        </div>
        </div>))}   
        </div>
    )
}


class BankingInfo  extends Component {
    render() {
        return (
            <div className="">
           

         <FormSection name='bankingDetailInfo'>
            <div className="form-box">
                <h2 className="box-title">Company Banking Details</h2>
                <div className="row d-flex">
                    <div className="form-d col-md-4 col-sm-6 form-input">
                        <Field name='accountNumber' label='Account No' component={TextFieldInput} />
                    </div>  
                    <div className="form-d col-md-4 col-sm-6 form-input">
                        <Field name='creditLimit' label='Credit Limit' component={TextFieldInput} />
                    </div>   
                    <div className="form-d col-md-4 col-sm-6 form-input">
                        <Field name='paymentTerms' placeholder='Payment Terms' component={ReactSelectWrapper} options={prop.paymentTerms}></Field>
                    </div>
                    <div className="form-d col-md-4 col-sm-6 form-input">
                        <Field name='invoiceCurrencyCode' label='Invoice Currency' component={TextFieldInput} />
                    </div>   
                    <div className="form-d col-md-4 col-sm-6 form-input">
                        <Field name='nameOnCheque' label='Print Name On Check As' component={TextFieldInput} />
                    </div>   
                    <div className="form-d col-md-4 col-sm-6 form-input">
                        <Field name='currencyCode' label='CurrencyCode' component={TextFieldInput} />
                    </div>   
                    <div className="form-d col-md-4 col-sm-6 form-input">
                        <Field name='preferredPaymentMethods' label='Preferred Payment Method' component={TextFieldInput} />
                    </div>   
                    <div className="form-d col-md-4 col-sm-6 form-input">
                        <Field name='uploadVoidCheck' label='Upload Void Check' component={TextFieldInput} />
                    </div>
                </div> 
            </div>
            </FormSection>

            <h2 className="box-title">Bank Details</h2>    
            <div className="row">
                <div className="col-md-12">
                                        
                    <FieldArray name='bankDetails' component={BankDetailComponent}/>
                        {/* {BankDetailFields.map((info) => {
                            return (
                                <div className="form-d col-md-4 col-sm-6 form-input">
                                    <Field name={info.name} label={info.label} component={info.component} />
                                </div>)
                        })

                        } */}
                        
                </div>
            </div>
            
        </div>
        )
    }
}

export default BankingInfo

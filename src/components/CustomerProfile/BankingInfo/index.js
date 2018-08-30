import React, { Component } from 'react';

import { reduxForm, Field,FieldArray,FormSection} from 'redux-form';

import CustomerBankDetails from '../../CustomerProfile/BankingInfo/customerBankDetails';
import BankDetailFields from '../../../components/common/BankDetails/bankDetails';
import Button from '@material-ui/core/Button';

import MenuItem from 'material-ui/MenuItem';
import { TextFieldInput } from '../../common/MaterialUiComponents';
let prop={};
prop.paymentTerms = [{label:'current',value:'current'},{label:'Net 30',value:'Net 30'},{label:'Net 45',value:'Net 45'}];
prop.invoiceCurrencyCode=[{label:'INR',value:'INR'},{label:'USD',value:'USD'}]


let BankDetailComponent = (props)=>
{
    const { fields, meta: { error } } = props;
    if(fields.length==0)
    fields.push();
    return (
        <div className="col-sm-12">
            
            {fields.map((bankDetails, index) => (
            <div className="form-box">
                <div className="row d-flex">
                
    

                  <div className="col-md-4 col-sm-6 form-d form-input">
                    <Field name={`${bankDetails}.accountName`} label={'Account Name'} component={TextFieldInput} />
                    </div>
                    <div className="col-md-4 col-sm-6 form-d form-input">
                    <Field name={`${bankDetails}.bankName`} label={'Bank Name <em>*</em>'} component={TextFieldInput} />
                    </div>
                    <div className="col-md-4 col-sm-6 form-d form-input">
                    <Field name={`${bankDetails}.branchName`} label={'Bank Branch <em>*</em>'} component={TextFieldInput} />
                    </div>
                    <div className="col-md-4 col-sm-6 form-d form-input">
                    <Field name={`${bankDetails}.bankRoutingNumber`} label={'Bank Routing No. <em>*</em>'} component={TextFieldInput} />
                    </div>
                    <div className="col-md-4 col-sm-6 form-d form-input">
                    <Field name={`${bankDetails}.bankAccountNumber`} label={'Bank Account No. ' } component={TextFieldInput} />
                    </div>
                    <div className="col-md-4 col-sm-6 form-d form-input">
                    <Field name={`${bankDetails}.bankBranch`} label={'Bank Branch <em>*</em>'} component={TextFieldInput} />
                    </div>
                    <div className="col-md-4 col-sm-6 form-d form-input">
                    <Field name={`${bankDetails}.bankNumber`} label={'Bank Number <em>*</em>'} component={TextFieldInput} />
                    </div>
                    <div className="col-md-4 col-sm-6 form-d form-input">
                    <Field name={`${bankDetails}.accountStatus`} label={'Account Status <em>*</em>'} component={TextFieldInput} />
                    </div>
                    <div className="col-md-4 col-sm-6 form-d form-input">
                    <Field name={`${bankDetails}.effectiveFrom`} label={'Effective From'} component={TextFieldInput} />
                    </div>
                    
                    
              {fields.length!=1&&<div className="col-md-4 col-sm-6"><Button variant="contained" color='secondary' onClick={() => fields.remove(index)}>Remove</Button></div>}
                </div></div>))}
                <div className="form-btn-group"><Button variant="contained" color='primary' primary={true} onClick={() => fields.push()}>Add New</Button></div>
        </div>
    )
}

class CustomerBankingInfo extends Component {
        render() {
            return (
            <div className="row d-flex">
                <h2 className="col-sm-12 box-title">Customer Banking Details</h2>
                <FormSection name='bankingDetailInfo'> 
                <div className="col-sm-12">
                <div className="row d-flex">
                { CustomerBankDetails.map((info)=>
         {
             
             if(info.type=='select')
             {
                         return (
                <div className="col-md-4 col-sm-6 form-d form-input">
                 <Field name={info.name} placeholder={`${info.label} <em>*</em>`} component={info.component} options={prop[info.name]} label={info.label}>
                 </Field>
                 </div>
             )
            }
            return (
            <div className="col-md-4 col-sm-6 form-d form-input">
                <Field name={info.name} label={info.label} component={info.component} />
            </div>
            )
         })
         }
         </div>
         </div>
            <div className="col-sm-12">
                <h2 className="box-title ">Bank Details</h2>
            </div>
                <FieldArray name='bankDetails' component={BankDetailComponent}/>
               </FormSection>
            </div>
            )

        }
}
export default CustomerBankingInfo
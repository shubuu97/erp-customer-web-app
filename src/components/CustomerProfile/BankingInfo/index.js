import React, { Component } from 'react';

import { reduxForm, Field,FieldArray,FormSection} from 'redux-form';

import CustomerBankDetails from '../../CustomerProfile/BankingInfo/customerBankDetails';
import BankDetailFields from '../../../components/common/BankDetails/bankDetails';
import Button from '@material-ui/core/Button';

import MenuItem from 'material-ui/MenuItem';
let prop={};
prop.paymentTerms = [{label:'FFF',value:'FFF'},{label:'AAA',value:'AAA'}];
prop.invoiceCurrencyCode=[{label:'FFF',value:'FFF'},{label:'AAA',value:'AAA'}]


let BankDetailComponent = (props)=>
{
    const { fields, meta: { error } } = props;
    if(fields.length==0)
    fields.push();
    return (
        <div className="col-sm-12">
            
            {fields.map((bankDetails, index) => (
            <div className="form-box2">
                <div className="row d-flex">
                
                {BankDetailFields.map((info) => {

                    if (info.type == 'select') {

                        return (
                            <div className="col-md-4 col-sm-6 form-d form-input">
                            <Field name={`${bankDetails}.${info.name}`} options={prop[info.name]} component={info.component} label={info.label}>
                            </Field>
                            </div>
                        )
                    }
                    return (<div className="col-md-4 col-sm-6 form-d form-input">
                    <Field name={`${bankDetails}.${info.name}`} label={info.label} component={info.component} />
                    </div>)
                })


                }
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
                 <Field name={info.name} component={info.component} options={prop[info.name]} label={info.label}>
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
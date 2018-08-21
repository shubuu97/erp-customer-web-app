import React, { Component } from 'react';

import { reduxForm, Field,FieldArray} from 'redux-form';

import CustomerBankDetails from '../../CustomerProfile/BankingInfo/customerBankDetails';
import BankDetailFields from '../../../components/common/BankDetails/bankDetails';
import Button from '@material-ui/core/Button';

import MenuItem from 'material-ui/MenuItem';
let prop={};
prop.paymentTerms = ['FFF','AAA'];
prop.invoiceCurrencyCode=['INR','USD']


let BankDetailComponent = (props)=>
{
    const { fields, meta: { error } } = props;
    if(fields.length==0)
    fields.push();
    return (
        <div className="col-sm-12">
            
            {fields.map((bankDetails, index) => (
            
                <div className="row d-flex">
                
                {BankDetailFields.map((info) => {
                    console.log(prop[info.name], "info")

                    if (info.type == 'select') {

                        return (
                            <div className="col-md-4 col-sm-6 form-d form-input">
                            <Field name={`${bankDetails}.${info.name}`} options={prop[info.name]} component={info.component} label={info.label}>
                            </Field>
                            </div>
                        )
                    }
                    return (<div className="col-md-4 col-sm-6 form-d form-input"><Field name={`${bankDetails}.${info.name}`} label={info.label} component={info.component} /></div>)
                })


                }
              {fields.length!=1&&<div className="col-md-4 col-sm-6"><Button variant="contained" color='secondary' onClick={() => fields.remove(index)}>Remove</Button></div>}
                </div>))}
                <div className="form-btn-group"><Button variant="contained" color='primary' primary={true} onClick={() => fields.push()}>Add New</Button></div>
        </div>
    )
}

class CustomerBankingInfo extends Component {
        render() {
            return (<div className="row d-flex">
                <header className="col-sm-12 box-heading2">Customer Banking Details</header>
               
                { CustomerBankDetails.map((info)=>
         {
             console.log(info.name)
             
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
                <header className="box-heading2 col-sm-12">Bank Details</header>
                <FieldArray name='bankDetails' component={BankDetailComponent}/>
               
            </div>
            )

        }
}
export default CustomerBankingInfo
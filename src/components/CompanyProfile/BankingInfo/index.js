import CompanyBankingDetails from './companyBankingDetails';
import { Field,reduxForm, FieldArray,FormSection } from 'redux-form';
import React, { Component } from 'react';
import { TextFieldInput } from '../../common/MaterialUiComponents';
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
        <div>
            
            {fields.map((bankDetails, index) => (
            
                <div>
                
                {BankDetailFields.map((info) => {

                    if (info.type == 'select') {

                        return (

                            <Field name={`${bankDetails}.${info.name}`} component={info.component} label={info.label}>
                                {prop[info.name].map((name) => {
                                    return (<MenuItem value={name} primaryText={name} />)
                                })}
                            </Field>

                        )
                    }
                    return (<Field name={`${bankDetails}.${info.name}`} label={info.label} component={info.component} />)
                })


                }
            
            {fields.length!=1&&<Button variant="contained" color='secondary' onClick={() => fields.remove(index)}>Remove</Button>}
                </div>))}
                <Button variant="contained" color='primary' onClick={() => fields.push()}>Add new</Button>]
        
        </div>
    )
}


class BankingInfo  extends Component {
    render() {
        return (
            <div className="row d-flex">
           <header className="box-heading2 col-sm-12">Company Banking Details</header>

         <FormSection name='bankingDetailInfo'>
         { CompanyBankingDetails.map((info)=>
         {
            
             
             if(info.type=='select')
             {
            
             return (
                <div className="form-d col-md-4 col-sm-6 form-input">
                 <Field options={prop[info.name]}  name={info.name} placeholder={info.label} component={info.component}>

                 </Field>
                </div>
             )
            }
            return (<div className="form-d col-md-4 col-sm-6 form-input">
                        <Field name={info.name} label={info.label} component={info.component} />
                    </div>)
         })
         }
            <header className="box-heading2 col-sm-12">Bank Details</header>
            <FieldArray name='bankDetails' component={BankDetailComponent}/>
                {/* {BankDetailFields.map((info) => {
                    return (
                        <div className="form-d col-md-4 col-sm-6 form-input">
                            <Field name={info.name} label={info.label} component={info.component} />
                        </div>)
                })

                } */}
                </FormSection>
        </div>
        )
    }
}

export default BankingInfo

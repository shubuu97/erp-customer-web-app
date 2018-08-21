import CompanyBankingDetails from './companyBankingDetails';
import { Field,reduxForm, FieldArray } from 'redux-form';
import React, { Component } from 'react';
import { TextFieldInput } from '../../common/MaterialUiComponents';
import RaiseButton from 'material-ui/RaisedButton';
import RaisedButton from 'material-ui/RaisedButton';
import MenuItem from 'material-ui/MenuItem';
import BankDetailFields from '../../../components/common/BankDetails/bankDetails'
let prop={};
prop.paymentTerms = ['FFF','AAA'];
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
                    console.log(prop[info.name], "info")

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
              {fields.length!=1&&<RaisedButton label="Remove" primary={true} onClick={() => fields.remove(index)} />}
                </div>))}
                <RaisedButton label="Add New" primary={true} onClick={() => fields.push()} />
        </div>
    )
}


class BankingInfo  extends Component {
    render() {
        return (
            <div className="row d-flex">
           <header className="box-heading2 col-sm-12">Company Banking Details</header>
         { CompanyBankingDetails.map((info)=>
         {
            
             
             if(info.type=='select')
             {
            
             return (
                <div className="form-d col-md-4 col-sm-6 form-input">
                 <Field name={info.name} component={info.component} label={info.label}>
                 {prop[info.name].map((name,index)=>
                {
                   return (<MenuItem value={name} primaryText={name} key={index} />)
                })}
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
        </div>
        )
    }
}

export default BankingInfo

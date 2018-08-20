import CompanyBankingDetails from './companyBankingDetails';
import { Field,reduxForm } from 'redux-form';
import React, { Component } from 'react';
import { TextFieldInput } from '../../common/MaterialUiComponents';
import RaiseButton from 'material-ui/RaisedButton';
import MenuItem from 'material-ui/MenuItem';
import BankDetailFields from '../../../components/common/BankDetails/bankDetails'
let props ={};
props.paymentTerms = ['FFF','AAA'];

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
                 {props[info.name].map((name)=>
                {
                   return (<MenuItem value={name} primaryText={name} />)
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
                {BankDetailFields.map((info) => {
                    return (
                        <div className="form-d col-md-4 col-sm-6 form-input">
                            <Field name={info.name} label={info.label} component={info.component} />
                        </div>)
                })

                }
        </div>
        )
    }
}

export default BankingInfo

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
            <div>
           <header>Company Banking Details</header>
         { CompanyBankingDetails.map((info)=>
         {
             console.log(info.name)
             
             if(info.type=='select')
             {
            
             return (
                
                 <Field name={info.name} component={info.component} label={info.label}>
                 {props[info.name].map((name)=>
                {
                   return (<MenuItem value={name} primaryText={name} />)
                })}
                 </Field>

             )
            }
            return (<Field name={info.name} label={info.label} component={info.component} />)
         })
         }
            <header>Bank Details</header>
                {BankDetailFields.map((info) => {
                    return (
                        <Field name={info.name} label={info.label} component={info.component} />)
                })

                }
        </div>
        )
    }
}

export default BankingInfo

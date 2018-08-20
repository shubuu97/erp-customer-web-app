import LicenceInfoFields from './LiceneceInfo';
import { Field,reduxForm } from 'redux-form';
import React, { Component } from 'react';
import { TextFieldInput } from '../../common/MaterialUiComponents';
import RaiseButton from 'material-ui/RaisedButton';
import MenuItem from 'material-ui/MenuItem'
let props ={};
props.licenceType = ['India','China'];
props.companyCategory = ['Rajasthan','Karnatak'];
props.country = ['India','China'];
props.state = ['Rajasthan','Karnatak'];
props.city = ['jaipur','banglaore'];

class LicenceInfo extends Component {
    render() {
        return (
            <div className="row d-flex">
          
         { LicenceInfoFields.map((info)=>
         {
             console.log(info.name)
             
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

export default LicenceInfo

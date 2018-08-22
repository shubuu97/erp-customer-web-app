import SiteInfoFields from './SiteInfo';
import { Field,reduxForm } from 'redux-form';
import React, { Component } from 'react';
import { TextFieldInput } from '../../common/MaterialUiComponents';
import RaiseButton from 'material-ui/RaisedButton';
import MenuItem from 'material-ui/MenuItem'
let props ={};
props.siteLicenceType = ['India','China'];
props.siteLicenceNo = ['Rajasthan','Karnatak'];
props.country = ['India','China'];
props.state = ['Rajasthan','Karnatak'];
props.city = ['jaipur','banglaore'];

class SiteInfo extends Component {
    render() {
        return (
            <div>
          
         { SiteInfoFields.map((info)=>
         {
             
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
        </div>
        )
    }
}

export default reduxForm(
    {
        form:'SiteInfo'
    }
)(SiteInfo)

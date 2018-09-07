import React, { Component } from 'react';

import { reduxForm, Field,FieldArray,FormSection} from 'redux-form';

import CustomerBankDetails from '../../CustomerProfile/BankingInfo/customerBankDetails';
import BankDetailFields from '../../../components/common/BankDetails/bankDetails';
import Button from '@material-ui/core/Button';

import MenuItem from 'material-ui/MenuItem';
import { TextFieldInput } from '../../common/MaterialUiComponents';
<<<<<<< HEAD
import Dropzone from  'react-dropzone';
import {uploadVoidCheck} from '../../../action/uploadVoidCheck';
import {APPLICATION_BFF_URL} from '../../../constants/urlConstants';
import withLoader from '../../../components/LoaderHoc';
import {showMessage} from '../../../action/common.js'
=======
import withLoader from '../../../components/LoaderHoc'

>>>>>>> 5772432327f1ed24a932c39ae439dc0f26335426
let prop={};
prop.paymentTerms = [{label:'current',value:'current'},{label:'Net 30',value:'Net 30'},{label:'Net 45',value:'Net 45'}];
prop.invoiceCurrencyCode=[{label:'INR',value:'INR'},{label:'USD',value:'USD'}]
prop.preferredPaymentMethods = [{label:'INR',value:'INR'},{label:'USD',value:'USD'}]

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
                    <Field name={`${bankDetails}.bankName`} label={'Bank Name *'} component={TextFieldInput} />
                    </div>
                    <div className="col-md-4 col-sm-6 form-d form-input">
                    <Field name={`${bankDetails}.branchName`} label={'Branch Name *'} component={TextFieldInput} />
                    </div>
                    <div className="col-md-4 col-sm-6 form-d form-input">
                    <Field name={`${bankDetails}.bankRoutingNumber`} label={'Bank Routing No. *'} component={TextFieldInput} />
                    </div>
                    <div className="col-md-4 col-sm-6 form-d form-input">
                    <Field name={`${bankDetails}.bankAccountNumber`} label={'Bank Account No. ' } component={TextFieldInput} />
                    </div>
                   
                    <div className="col-md-4 col-sm-6 form-d form-input">
                    <Field name={`${bankDetails}.bankNumber`} label={'Bank Number *'} component={TextFieldInput} />
                    </div>
                    <div className="col-md-4 col-sm-6 form-d form-input">
                    <Field name={`${bankDetails}.accountStatus`} label={'Account Status *'} component={TextFieldInput} />
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

    constructor(props)
    {
        super(props)
        this.state = {
            acceptedFile:[]
        }
    }

    dropHandler = (accept,reject)=>
    {
    if(accept.length>0)
    {    
     this.setState({acceptedFile:accept});
     let formData = new FormData();
formData.append('file',accept[0])
formData.append('mediaType','customer')
formData.append('mediaTypeId','1234567')
this.props.dispatch(uploadVoidCheck(`${APPLICATION_BFF_URL}/customer/fileupload`,formData,'fileUpload'))
.then((data)=>
{
    debugger;
    console.log(data,"data")
    this.props.autofill('bankingDetailInfo.uploadVoidCheck',data.message.relativeURL)
    this.props.dispatch(showMessage({text:'Upload success',isSuccess:true}));
    setTimeout(()=>{
        this.props.dispatch(showMessage({text:'',isSuccess:true}));

    },6000)
})
.catch((error)=>
{
    this.props.dispatch(showMessage({text:error.message,isSuccess:true}));
    setTimeout(()=>{
        this.props.dispatch(showMessage({text:'',isSuccess:true}));

    },6000)
})

    }
    }
        render() {

            console.log(this.props,"props is here")
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
                 <Field name={info.name} placeholder={`${info.label} *`} component={info.component} options={prop[info.name]} label={info.label}>
                 </Field>
                 </div>
             )
            }
            if(info.type=='fileInput')
            {
                return (
    <div>
                    <Field
    component={TextFieldInput}
    name="uploadVoidCheck"
    type="hidden"
    style={{ height: 0 }}
    
/>
<Dropzone
onDrop={this.dropHandler}>
<div>{this.state.acceptedFile&&Array.isArray(this.state.acceptedFile)&&this.state.acceptedFile.length>0?<img height={'200px'} width={'200px'} src={this.state.acceptedFile[0].preview}/>:<div>Try dropping some files here, or click to select files to upload.</div>}</div>
</Dropzone>
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
<<<<<<< HEAD
export default  withLoader(CustomerBankingInfo)
=======
export default withLoader(CustomerBankingInfo)
>>>>>>> 5772432327f1ed24a932c39ae439dc0f26335426

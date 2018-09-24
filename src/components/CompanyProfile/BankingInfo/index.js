
import { Field,reduxForm, FieldArray,FormSection } from 'redux-form';
import React, { Component } from 'react';
import { TextFieldInput,ReactSelectWrapper } from '../../common/MaterialUiComponents';
import Button from '@material-ui/core/Button';
import MenuItem from 'material-ui/MenuItem';
import BankDetailFields from '../../../components/common/BankDetails/bankDetails'
import withLoader from '../../LoaderHoc';
import Dropzone from  'react-dropzone';
import {uploadVoidCheck} from '../../../action/uploadVoidCheck';
import {APPLICATION_BFF_URL} from '../../../constants/urlConstants';
import {showMessage} from '../../../action/common.js'



let BankDetailComponent = (props)=>
{
    const { fields, meta: { error } } = props;
    if(fields.length==0)
    fields.push();
    return (
        
           <div> {fields.map((bank,index)=>

            (<div className="form-box">
            <div className="row d-flex">
            <div className="form-d col-md-4 col-sm-6 form-input">
                <Field name={`${bank}.accountName`} label='Account Name *' component={TextFieldInput} />
            </div>  
            <div className="form-d col-md-4 col-sm-6 form-input">
                <Field name={`${bank}.bankName`} label='Bank Name *' component={TextFieldInput} />
            </div>   
           
            <div className="form-d col-md-4 col-sm-6 form-input">
                <Field name={`${bank}.branchName`} label='Branch Name *' component={TextFieldInput} />
            </div>   
            <div className="form-d col-md-4 col-sm-6 form-input">
                <Field name={`${bank}.bankRoutingNumber`} label='Bank Routing No. *' component={TextFieldInput} />
            </div>   
            <div className="form-d col-md-4 col-sm-6 form-input">
                <Field name={`${bank}.bankAccountNumber`} label='Bank Account No. *' component={TextFieldInput} />
            </div>   
            
            <div className="form-d col-md-4 col-sm-6 form-input">
                <Field name={`${bank}.bankNumber`} label='Bank Number *' component={TextFieldInput} />
            </div>
            <div className="form-d col-md-4 col-sm-6 form-input">
                <Field name={`${bank}.accountStatus`} label='Account Status *' component={TextFieldInput} />
            </div>
        
    
                {(fields.length == 1||(fields.get(index)&&fields.get(index)._id)) ?null:<div className="col-sm-12 form-btn-group-left"> <Button variant="contained" color='secondary' onClick={() => fields.remove(index)}>Remove</Button></div>}
        </div>
        </div>))}   
        <div className="form-btn-group-left"><Button variant="contained" color='primary' onClick={() => fields.push()}>Add new</Button></div>
        </div>
    )
}


class BankingInfo  extends Component {
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
    this.props.autofill('bankingDetailInfo.voidCheckUrl',data.message.relativeURL)
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
        console.log(this.props,'props is here')
        return (
            <div className="">
           

         <FormSection name='bankingDetailInfo'>
            <div className="form-box">
                <h2 className="box-title">Company Banking Details</h2>
                <div className="row d-flex">
                    <div className="form-d col-md-4 col-sm-6 form-input">
                        <Field name='accountNumber' label='Account No *' component={TextFieldInput} />
                    </div>  
                    <div className="form-d col-md-4 col-sm-6 form-input">
                        <Field name='creditLimit' label='Credit Limit' component={TextFieldInput} />
                    </div>   
                    <div className="form-d col-md-4 col-sm-6 form-input form-select-label">
                        <Field name='paymentTerms' placeholder='Payment Terms *' component={ReactSelectWrapper} options={this.props.paymentTerms}></Field>
                    </div>
                    <div className="form-d col-md-4 col-sm-6 form-input form-select-label">
                        <Field name='invoiceCurrencyCode' label='Invoice Currency Code *' placeholder='Invoice Currency Code *' options={this.props.currencyCodes} component={ReactSelectWrapper} />
                    </div>   
                    <div className="form-d col-md-4 col-sm-6 form-input">
                        <Field name='nameOnCheque' label='Print Name On Check As *' component={TextFieldInput} />
                    </div>   
                    <div className="form-d col-md-4 col-sm-6 form-input">
                        <Field name='currencyCode' label='Currency Code *' component={TextFieldInput} />
                    </div>   
                    <div className="form-d col-md-4 col-sm-6 form-input form-select-label">
                        <Field name='preferredPaymentMethods' placeholder='Preferred Payment Method *' options={this.props.paymentMethods} component={ReactSelectWrapper} />
                    </div>   
                    <div className="form-d col-md-4 col-sm-6 form-input">
                    <Field
    component={TextFieldInput}
    name="voidCheckUrl"
    type="hidden"
    style={{ height: '0', display:'none' }}
    
/>
<Dropzone className="dropzone"
onDrop={this.dropHandler}>
<div>{this.state.acceptedFile&&Array.isArray(this.state.acceptedFile)&&this.state.acceptedFile.length>0?<img height={'200px'} width={'200px'} src={this.state.acceptedFile[0].preview}/>:<div>{this.props.imageUrl?<img height={'150px'} width={'150px'} src={`https://s3.ap-south-1.amazonaws.com/aob-deverp/${this.props.imageUrl}`}/>:<div>Try dropping some files here, or click to select files to upload.</div>}</div>}</div>

</Dropzone>
                    </div>
                </div> 
            </div>
            

            <h2 className="box-title">Bank Details</h2>    
            <div className="row">
                <div className="col-md-12">
                                        
                    <FieldArray  name='bankDetails' component={BankDetailComponent}/>
                        {/* {BankDetailFields.map((info) => {
                            return (
                                <div className="form-d col-md-4 col-sm-6 form-input">
                                    <Field name={info.name} label={info.label} component={info.component} />
                                </div>)
                        })

                        } */}
                        
                </div>
            </div>
            </FormSection>
        </div>
        )
    }
}

export default withLoader(BankingInfo)

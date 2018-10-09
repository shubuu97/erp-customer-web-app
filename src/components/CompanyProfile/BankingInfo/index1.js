
import { Field, reduxForm, FieldArray, FormSection } from 'redux-form';
import React, { Component } from 'react';
import { TextFieldInput, ReactSelectWrapper } from '../../common/MaterialUiComponents';
import Button from '@material-ui/core/Button';
import MenuItem from 'material-ui/MenuItem';
import BankDetailFields from '../../../components/common/BankDetails/bankDetails'
import withLoader from '../../LoaderHoc';
import Dropzone from 'react-dropzone';
import { uploadVoidCheck } from '../../../action/uploadVoidCheck';
import { APPLICATION_BFF_URL } from '../../../constants/urlConstants';
import { showMessage } from '../../../action/common.js'
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import nature from './../../../assets/images/nature.jpg';
import expand from 'keypather/expand';
import flatten from 'keypather/flatten'
import _get from 'lodash/get';
function Transition(props) {
    return <Slide direction="up" {...props} />;
}



class BankDetailComponent extends Component
{
constructor(props)
{
    super(props);
    this.state={bankDetails:[]}
}

    dropHandler = (accept, reject,fieldNumber) => {
    let expandObj = {}
    let flat = flatten(this.state.bankDetails);
    console.log(bankDetails,"+++++")
    expandObj[fieldNumber] = accept[0];
    Object.keys(flat).map((flatobj)=>
{
    expandObj[flatobj] = flat[flatobj];
})
    let bankDetails = expand(expandObj);
     this.setState({bankDetails});


        if (accept.length > 0) {
            this.setState({ fieldNumber: accept,removed:false });
            let formData = new FormData();
            formData.append('file', accept[0])
            formData.append('mediaType', 'customer')
            formData.append('mediaTypeId', '1234567')
            this.props.dispatch(uploadVoidCheck(`${APPLICATION_BFF_URL}/customer/fileupload`, formData, 'fileUpload'))
                .then((data) => {
                    this.props.autofill(fieldNumber, data.message.relativeURL)
                    this.props.dispatch(showMessage({ text: 'Upload success', isSuccess: true }));
                    setTimeout(() => {
                        this.props.dispatch(showMessage({ text: '', isSuccess: true }));

                    }, 6000)
                })
                .catch((error) => {
                    this.props.dispatch(showMessage({ text: error.message, isSuccess: true }));
                    setTimeout(() => {
                        this.props.dispatch(showMessage({ text: '', isSuccess: true }));

                    }, 6000)
                })

        }
    }
render() {
    
    const { fields, meta: { error } } = this.props;
    if (fields.length == 0)
        fields.push();
    return (

        <div> {fields.map((bank, index) =>

            (<div className="form-box">
                <div className="row d-flex">
                <div className="form-d col-md-4 col-sm-6 form-input form-select-label">
                                <Field  name={`${bank}.preferredPaymentMethods`} placeholder='Preferred Payment Method *' options={this.props.paymentMethods} component={ReactSelectWrapper} />
                            </div>
                            
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
                  { _get(this.props,`formValue.bankingDetailInfo.bankDetails.${index}.preferredPaymentMethods`,'')=="Checking"? <div className="form-d col-md-4 col-sm-6 form-input">
                                <Field name={`${bank}.nameOnCheque`} label='Print Name On Check As *' component={TextFieldInput} />
                            </div>:null}

                 { _get(this.props,`formValue.bankingDetailInfo.bankDetails.${index}.preferredPaymentMethods`,'')=="Checking"? 
                    <div className="dropzone-parent">
                                <span onClick={this.handleRemove}>Remove</span>
                                    <Dropzone className="dropzone"
                                        onDrop={(accept,reject)=>this.dropHandler(accept,reject,`${bank}.voidCheckUrl`)}>
                                       <div>{_get(this.state,`bankDetails.bankDetails.${index}.voidCheckUrl`,null) ? <img height={'200px'} width={'200px'} src={this.state.bankDetails.bankDetails[index].voidCheckUrl.preview} /> : <div>{this.props.imageUrl ? <img height={'150px'} width={'150px'} src={`${this.props.imageUrl}`} /> : <div>Try dropping some files here, or click to select files to upload.</div>}</div>}</div>
            
        
                                    </Dropzone>
                                    <span className="image-zoom" onClick={this.handleOpenImage}><i class="fa fa-search-plus" aria-hidden="true"></i></span>
                                </div>:null}


                    {(fields.length == 1 || (fields.get(index) && fields.get(index)._id)) ? null : <div className="col-sm-12 form-btn-group-left"> <Button variant="contained" color='secondary' onClick={() => fields.remove(index)}>Remove</Button></div>}
                </div>
            </div>))}
            <div className="form-btn-group-left"><Button variant="contained" color='primary' onClick={() => fields.push()}>Add new</Button></div>
        </div>
    )
}
}

class BankingInfo extends Component {
    constructor(props) {
        super(props)
        this.state = {
            acceptedFile: [],
            openImage: false,
            removed:false
        }
    }
    handleClose = () => {
        this.setState({ openImage: false })
    }
    handleOpenImage = () => {
        this.setState({ openImage: true })
    }
  
    handleRemove=()=>
    {
        this.props.autofill('bankingDetailInfo.voidCheckUrl', '');
        this.setState({removed:true})

    }
    componentWillReceiveProps(props)
    {
        console.log(props);
    }
    render() {
        console.log(this.props, 'props is here');
        let customerStaus = localStorage.getItem('customerStatus');
        return (
            <div className="">


                <FormSection name='bankingDetailInfo'>
                    <div className="form-box">
                        <h2 className="box-title">Company Banking Details</h2>
                        <div className="row d-flex">
                            <div className="form-d col-md-4 col-sm-6 form-input">
                                <Field  disabled={customerStaus=="Approved"?true:false} name='accountNumber' label='Account No *' component={TextFieldInput} />
                            </div>
                            <div className="form-d col-md-4 col-sm-6 form-input">
                                <Field disabled={customerStaus=="Approved"?true:false} name='creditLimit' label='Credit Limit' component={TextFieldInput} />
                            </div>
                            <div className="form-d col-md-4 col-sm-6 form-input form-select-label">
                                <Field disabled={customerStaus=="Approved"?true:false} name='paymentTerms' placeholder='Payment Terms *' component={ReactSelectWrapper} options={this.props.paymentTerms}></Field>
                            </div>
                            <div className="form-d col-md-4 col-sm-6 form-input form-select-label">
                                <Field disabled={customerStaus=="Approved"?true:false} name='invoiceCurrencyCode' label='Invoice Currency Code *' placeholder='Invoice Currency Code *' options={this.props.currencyCodes} component={ReactSelectWrapper} />
                            </div>
                            <div className="form-d col-md-4 col-sm-6 form-input form-select-label">
                                <Field disabled={customerStaus=="Approved"?true:false} name='currencyCode'  placeholder='Currency Code *' options={this.props.currencyCodes} component={ReactSelectWrapper} />
                            </div>
                            <div className="form-d col-md-4 col-sm-6 form-input">
                                <Field
                                    component={TextFieldInput}
                                    name="voidCheckUrl"
                                    type="hidden"
                                    style={{ height: '0', display: 'none' }}

                                />
                               

                            </div>
                        </div>
                    </div>


                    <h2 className="box-title">Bank Details</h2>
                    <div className="row">
                        <div className="col-md-12">

                            <FieldArray formValue={this.props.formValue} paymentMethods={this.props.paymentMethods} autofill={this.props.autofill} dispatch={this.props.dispatch} name='bankDetails' component={BankDetailComponent} />
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
                <Dialog
                    open={this.state.openImage}
                    TransitionComponent={Transition}
                    keepMounted
                    onClose={this.handleClose}
                    aria-labelledby="alert-dialog-slide-title"
                    aria-describedby="alert-dialog-slide-description"
                    className="dialogbox-ui dialog-imgupload"
                >
                    <DialogTitle id="alert-dialog-slide-title">
                        {/* <h2 className="modal-title">{"Confirmation"}</h2> */}
                        <span className="modal-close2" onClick={this.handleClose}></span>
                    </DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-slide-description">
                            <img src={this.state.acceptedFile.length > 0 ? this.state.acceptedFile[0].preview : this.props.imageUrl} className="imgBig" />
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions className="col-sm-12 dialog-btn">
                    </DialogActions>
                </Dialog>
            </div>
        )
    }
}

export default withLoader(BankingInfo)

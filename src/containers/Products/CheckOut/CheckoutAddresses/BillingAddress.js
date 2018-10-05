import React, { Component } from 'react';
import { reduxForm } from 'redux-form';
import DetailForm from './detailForm';
import { connect } from 'react-redux';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import asyncValidate from './validate';
import {postData} from '../../../../action/common/post';
import _get from 'lodash/get';
import {showMessage} from '../../../../action/common.js';
import {editAddress} from '../../../../action/editAddress';
import {getData} from '../../../../action/common/get'
import flatten from 'keypather/flatten';
import expand from 'keypather/expand';
import {resetZipToInitial} from '../../../../action/fetchFromZip';
import {APPLICATION_BFF_URL} from '../../../../constants/urlConstants'


class BillingAddress extends Component {
  state = {
    open: false
  }
  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
    this.props.setEditOff();
    this.props.dispatch(editAddress({}));
    this.props.dispatch(resetZipToInitial());
  };

  componentWillReceiveProps(nextProps)
  {
  console.log(nextProps,"next props is here")
   if(nextProps.openEdit)
   {
     this.handleClickOpen()
   }
  }

   
  formSubmitHandler = (formData) => {
    let addressType = this.props.addressType
    let data = {
      ...formData,addressType:addressType,
      isActive: true,
      isPrimary: this.props.length==0 ? true : false
      }

    let options = {
    init: 'INIT_SAVE_ADDRESS',
    success: 'SUCCESSFULLY_SAVED_ADDRESS',
    error: 'FAILED_SAVE_ADDRESS',  
    }
    console.log(this.props.updateAddressBook, 'updateAddressBook');
    let address = ''
    if(localStorage.getItem('role')=='company')
    {
      address = ' https://deverp.allonblock.com/customer-bff/businesscustomer/5ba38eb1aa4215001860e535/addressbook';

    }
    else
    {
      address = this.props.updateAddressBook.href;

    }
    this.props.dispatch(postData(address, data, null, options, this.props.updateAddressBook.verb)).then((success) => {
      
      this.props.reset(); 
      this.props.dispatch(showMessage({text:'Address Saved Succesfully',isSuccess:true}));
    setTimeout(()=>{
        this.props.dispatch(showMessage({text:'',isSuccess:true}));


    },6000);
    this.props.onSaveFormData();
    this.handleClose();
    })
}
  render() {
    console.log("props is here", this.props)
    const {handleSubmit}=this.props;
    return (
      <div>
        <Button variant="contained" size='medium' color="primary" classes={{ root: '' }} onClick={this.handleClickOpen}>Add New Address</Button>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="form-dialog-title"
          className="dialogbox-ui"
        >
          <form onSubmit={handleSubmit(this.formSubmitHandler)}>
            <DialogContent>
              <h2 className="modal-title">{this.props.headerTitle} <Button variant="contained" classes={{ root: 'modal-close' }} onClick={this.handleClose} color="secondary"></Button></h2>
              <DetailForm  hideEmail={this.props.hideEmail} addContact={this.props.addContactField} />
              <Button variant="contained" type="submit" color="secondary">
                Save Address
              </Button>
            </DialogContent>
          </form>
        </Dialog>
      </div>
    )
  }
}

BillingAddress = reduxForm({
  form: 'BillingAddress',
  asyncValidate,
  enableReinitialize: true,
  keepDirtyOnReinitialize:true
})(BillingAddress)


function mapStateToProps(state) {
  let initialValues = _get(state,'editAddressData.data',{})

  if (state.zipCodeData && state.zipCodeData.meta) {
    let meta = state.zipCodeData.meta;
    if (meta.form == "BillingAddress") {
      let fieldValue = meta.field.split('.')[0];
      if (fieldValue == 'zipCode') {
        let {country,state:stateobj,city}  = state.zipCodeData.lookUpData;
        let expandObj = {};
        expandObj = flatten(state.editAddressData.data);

        expandObj[`country`] = country;
        expandObj[`state`] = stateobj;
        expandObj[`city`] = city;
        initialValues = expand(expandObj);

      } else {
        let { country, state: stateobj, city } = state.zipCodeData.lookUpData;
        initialValues.country = country;
        initialValues.state = stateobj;
        initialValues.city = city;
      }
    }
  }
  console.log(initialValues, 'initialValues');
  let updateAddressBook = _get(state, 'AddressBookData.lookUpData.data._links.updateAddressBook',{})
  let billingAddress =  _get(state,'AddressBookData.lookUpData.data.billingAddress',[]);

  return {initialValues,updateAddressBook,billingAddress }
}

export default connect(mapStateToProps)(BillingAddress)
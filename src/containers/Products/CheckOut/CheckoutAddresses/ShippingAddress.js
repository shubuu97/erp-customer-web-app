import React,{Component} from 'react';
import {reduxForm} from 'redux-form';
import DetailForm from './detailForm';
import {connect} from 'react-redux';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import asyncValidate from './validate';
import _get from 'lodash/get';
import {postData} from '../../../../action/common/post';


 class ShipDetailsForm extends Component
{
    state = {
        open:false
    }
    handleClickOpen = () => {
        this.setState({ open: true });
      };
    
      handleClose = () => {
        this.setState({ open: false });
      };
      formSubmitHandler = (formData) => {
        let data = {
            fullName: formData.firstName + ' ' + formData.lastName,
            address: formData.streetAddress + formData.streetAddress,
            contactNumber: formData.contact,
            city: formData.city,
            state: formData.state,
            addressType : "shipping",
            zipCode: formData.zipCode, 
            country: formData.country,
            isPrimary: false
        }
    
        let options = {
        init: 'INIT_SAVE_ADDRESS',
        success: 'SUCCESSFULLY_SAVED_ADDRESS',
        error: 'FAILED_SAVE_ADDRESS',  
        }
        console.log(this.props.updateAddressBook, 'updateAddressBook');
        this.props.dispatch(postData(this.props.updateAddressBook.href, data, null, options, this.props.updateAddressBook.verb)).then((success) => {
        console.log("Address Saved Successfully", success);
        })
    }
    render()
    {
        return(
            <div>
                <Button variant="contained" size='large' color="secondary" classes={{ root: 'add-cart-button' }} onClick={this.handleClickOpen}>New Address</Button>
                 <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="form-dialog-title"
          className="dialogbox-ui"
        >
                <DialogContent>
                <h2 className="modal-title">Shipping Address <Button variant="contained" classes={{ root: 'modal-close' }} onClick={this.handleClose} color="secondary"></Button></h2>
                <DetailForm/>
            
                </DialogContent>
                <DialogActions className="m-footer">
            
            <Button type="submit" variant="contained" onClick={this.handleClose} color="secondary">
              Save Address
            </Button>
          </DialogActions>
                </Dialog>
            </div>
        )
    }
}

 ShipDetailsForm = reduxForm({
    form:'ShippingAddress',
    enableReinitialize:true,
    keepDirtyOnReinitialize:true,
    asyncValidate
})(ShipDetailsForm)


function mapStateToProps(state)
{
    let initialValues = {}

    if(state.zipCodeData && state.zipCodeData.meta)
    {
     let meta = state.zipCodeData.meta;
     if(meta.form=="ShippingAddress")
     {
      let fieldValue = meta.field.split('.')[0];
      if(fieldValue != 'zipCode') {
        let {country,state:stateobj,city}  = state.zipCodeData.lookUpData;
        let expandObj = {};
        expandObj[`${fieldValue}.country`] = country;
        expandObj[`${fieldValue}.state`] = stateobj;
        expandObj[`${fieldValue}.city`] = city;
  
      } else {
        let {country,state:stateobj,city}  = state.zipCodeData.lookUpData;
        initialValues.country = country;
        initialValues.state = stateobj;
        initialValues.city = city;
      }
     }
    }
    let updateAddressBook = _get(state, 'AddressBookData.lookUpData.data._links.updateAddressBook',{})

    console.log(initialValues,'initialValues')
   return {initialValues:initialValues,updateAddressBook}
}

export default connect(mapStateToProps)(ShipDetailsForm)
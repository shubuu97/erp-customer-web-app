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


class BillingAddress extends Component {
  state = {
    open: false
  }
  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  render() {
    console.log("props is here", this.props)
    return (
      <div>
        <Button variant="contained" size='large' color="secondary" classes={{ root: 'add-cart-button' }} onClick={this.handleClickOpen}>New Address</Button>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="form-dialog-title"
          className="dialogbox-ui"
        >
          <DialogContent>
            <h2 className="modal-title">Billing Address <Button variant="contained" classes={{ root: 'modal-close' }} onClick={this.handleClose} color="secondary"></Button></h2>
            <DetailForm />

          </DialogContent>
          <DialogActions className="m-footer">
            
            <Button variant="contained" onClick={this.handleClose} color="secondary">
              Save Address
                  </Button>
          </DialogActions>
        </Dialog>
      </div>
    )
  }
}

BillingAddress = reduxForm({
  form: 'BillingAddress',
  asyncValidate,
  enableReinitialize: true,
  keepDirtyOnReinitialize: true
})(BillingAddress)


function mapStateToProps(state) {
  let initialValues = {}

  if (state.zipCodeData && state.zipCodeData.meta) {
    let meta = state.zipCodeData.meta;
    if (meta.form == "BillingAddress") {
      let fieldValue = meta.field.split('.')[0];
      if (fieldValue != 'zipCode') {
        let { country, state: stateobj, city } = state.zipCodeData.lookUpData;
        let expandObj = {};
        expandObj[`${fieldValue}.country`] = country;
        expandObj[`${fieldValue}.state`] = stateobj;
        expandObj[`${fieldValue}.city`] = city;

      } else {
        let { country, state: stateobj, city } = state.zipCodeData.lookUpData;
        initialValues.country = country;
        initialValues.state = stateobj;
        initialValues.city = city;
      }
    }
  }
  console.log(initialValues, 'initialValues')
  return { initialValues: initialValues }
}

export default connect(mapStateToProps)(BillingAddress)
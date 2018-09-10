import React, { Component } from 'react';
import { reduxForm } from 'redux-form';

import { connect } from 'react-redux';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import _get from 'lodash/get'



class PaymentStatus extends Component {
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
       <a> <span style={{cursor:'pointer'}} onClick={this.handleClickOpen}>Payment Status</span></a>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="form-dialog-title"
          className="dialogbox-ui"
        >
          <DialogContent>
            <h2 className="modal-title">Payment Status</h2>
            <div>
                <div>Total Amount $130 </div>
                <div>Paid Amount $43.33 </div>
                <div>Due Amount $86.66 </div>
                <div>Payment Method    {_get(this,'props.payment.method','')}  </div>
                <div>Payment Term  {_get(this,'props.payment.paymentTerms','')}  </div>
                </div>


          </DialogContent>
          <DialogActions className="m-footer">
            <Button variant="contained" classes={{ root: 'modal-close' }} onClick={this.handleClose} color="secondary"></Button>
            
          </DialogActions>
        </Dialog>
      </div>
    )
  }
}

export default PaymentStatus
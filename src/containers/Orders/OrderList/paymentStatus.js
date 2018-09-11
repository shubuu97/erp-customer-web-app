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
          className="dialogbox-ui small"
        >
          <DialogContent>
            <h2 className="modal-title">Payment Status <Button variant="contained" classes={{ root: 'modal-close' }} onClick={this.handleClose} color="secondary"></Button></h2>
            <div className="ps-first-section">
              <div className="ps-row"><label>Payment Date</label> <span>15th Aug, 2018</span> </div>
              <div className="ps-row"><label>Payment Time</label> <span>12:30 PM</span> </div>
              <div className="ps-row"><label>Payment Method</label> <span>{_get(this,'props.payment.method','')} </span> </div>
            </div>
            <div className="ps-second-section">               
              <div className="ps-row"><label>Payment Term</label> <span>{_get(this,'props.payment.paymentTerms','')} </span> </div>
              <div className="ps-row"><label>Total Amount</label> <span>$130</span> </div>
              <div className="ps-row"><label>Paid Amount</label> <span>$120</span> </div>
              <div className="ps-row"><label>Due Amount</label> <span>$10</span> </div>
            </div>


          </DialogContent>
          <DialogActions className="m-footer">
            
            
          </DialogActions>
        </Dialog>
      </div>
    )
  }
}

export default PaymentStatus
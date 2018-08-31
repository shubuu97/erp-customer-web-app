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
import _get from 'lodash/get'

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
    
    render()
    {
        return(
            <div>
                <Button onClick={this.handleClickOpen}>Add New Shipping Address</Button>
                 <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="form-dialog-title"
        >
                <DialogContent>
                <DetailForm/>
            
                </DialogContent>
                <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Cancel
            </Button>
            <Button onClick={this.handleClose} color="primary">
              Submit
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
    console.log(initialValues,'initialValues')
   return {initialValues:initialValues}
}

export default connect(mapStateToProps)(ShipDetailsForm)
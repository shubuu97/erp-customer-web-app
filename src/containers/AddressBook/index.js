import React,{Component} from "react";
import {connect} from 'react-redux';
import profileSideBarHoc from '../../components/profileSideBarHoc'
import {getData} from '../../action/common/get'
import {REQUEST_ADDRESS_DATA,RECEIVED_ADDRESS_DATA,RECEIVED_ADDRESS_DATA_ERROR} from '../../constants/GetAddress'
import {APPLICATION_BFF_URL} from '../../constants/urlConstants';
import _get from 'lodash/get';
import DisplayAddress from './DisplayAddress/displayAddress';
import BillingAddress from '../Products/CheckOut/CheckoutAddresses/BillingAddress';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import Button from '@material-ui/core/Button';
import {postData} from '../../action/common/post'
function Transition(props) {
    return <Slide direction="up" {...props} />;
  }

 class AddressBook extends Component

{
    constructor(props) {
        super(props);
        this.state = {
          openDeleteAddress: false,
          index:null,
          addressType:null,
        }
    
      }

    componentDidMount()
    {
        let url=''
        let options = {
			init: REQUEST_ADDRESS_DATA,
			success: RECEIVED_ADDRESS_DATA,
			error: RECEIVED_ADDRESS_DATA_ERROR
        }
        if(localStorage.getItem('role')=="company")
        {
            url=`${APPLICATION_BFF_URL}/businesscustomer/${localStorage.getItem('id')}/addressbook`
        }
        else
        {
            url=`${APPLICATION_BFF_URL}/customer/${localStorage.getItem('id')}/addressbook`
        }
        this.props.dispatch(getData(url, "",options))
    }
    deleteHandler=(index, addressType)=>
    {
        this.setState({ openDeleteAddress: true, index:index, addressType:addressType})
    console.log(index,"index is here");
    console.log(addressType,"addressType is here");

    }
    handleClose = () => {
        this.setState({ openDeleteAddress: false, index:null, addressType:null });
      };
    
      handleDelete=()=>
      { 
          let data;
        let options = {
            init: 'INIT_DELETE_ADDRESS',
            success: 'SUCCESSFULLY_DELETED_ADDRESS',
            error: 'FAILED_DELETING_ADDRESS',  
        }

          if(this.state.addressType=="billing")
          {
         _get(this.props,'billingAddress',[]).map(address=>{
             console.log(this.props.billingAddress, "billing address")
                if(this.state.index==address.index)
                {
                    address.isActive=false
                }
                data=address;
         })
        }
        else if(this.state.addressType=='shipping')
        {
            _get(this.props,'shippingAddress',[]).map(address=>{
                console.log(this.props.billingAddress, "billing address")
                   if(this.state.index==address.index)
                   {
                    
                       address.isActive=false
                       
                   }
                   data=address;
            })
            
            this.props.dispatch(postData(this.props.updateAddressBook.href, data, null, options, this.props.updateAddressBook.verb)).then((success) => {
                console.log("Address updated Successfully", success);
            })
        }
        this.setState({openDeleteAddress: false, index:null, addressType:null})
      }

    render() {
      let ShippingAddressBox = _get(this.props,'shippingAddress',[]).map((addField,index) => {
            return <DisplayAddress 
                key={addField.id}
                index={index}
                isLoading={this.props.isLoading}
                addressType={addField.addressType}
                address={addField.address}
                city={addField.city}
                deleteHandler={this.deleteHandler}
                fullName={addField.fullName}
                state={addField.state}
                country={addField.country}
                zip={addField.zipCode} />
        })

        let BillingAddressBox = _get(this.props,'billingAddress',[]).map((addField,index) => {
            return <DisplayAddress 
                key={addField.id}
                fullName={addField.fullName}
                deleteHandler={this.deleteHandler}
                index={index}
                isLoading={this.props.isLoading}
                addressType={addField.addressType}
                address={addField.address}
                city={addField.city}
                state={addField.state}
                country={addField.country}
                zip={addField.zipCode} />
        })
        return(
            <div className="staticProfile-box">
                <h2 className="cart-heading">Address Book</h2>
                <div className="row">
                    <div className="col-md-6">
                        <h3 className="addressbook-title">Shipping Address</h3>
                        {ShippingAddressBox}
                        <BillingAddress 
                            onSaveFormData={this.addressSaveHandler} 
                            hideEmail={true} 
                            addContactField={true}
                            addressType="Shipping Address" />
                    </div>
                    <div className="col-md-6">
                        <h3 className="addressbook-title">Billing Address</h3>
                        {BillingAddressBox}
                        <BillingAddress 
                            onSaveFormData={this.addressSaveHandler} 
                            hideEmail={true} 
                            addContactField={true} 
                            addressType="Billing Address" />
                    </div>
                    <Dialog
          open={this.state.openDeleteAddress}
          TransitionComponent={Transition}
          keepMounted
          onClose={this.handleClose}
          aria-labelledby="alert-dialog-slide-title"
          aria-describedby="alert-dialog-slide-description"
          className="dialogbox-ui small"
        >
          <DialogTitle id="alert-dialog-slide-title">
            <h2 className="modal-title">{"Confirmation"}</h2>
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-slide-description">
              <p className="text-dialog">Are you sure want to delete Address?</p>
            </DialogContentText>
          </DialogContent>
          <DialogActions className="col-sm-12 dialog-btn">
            <Button onClick={this.handleDelete} variant="contained" color="primary">
              Agree
            </Button>
            <Button onClick={this.handleClose} variant="contained" color="secondary">
              Disagree
            </Button>
          </DialogActions>
        </Dialog>
                </div>
                {/* <div className="row">
                    <div className="col-md-12">
                        <BillingAddress 
                            onSaveFormData = {this.addressSaveHandler} hideEmail={true} addContactField={true} />
                    </div>
                </div> */}
            </div>
        )
    }
}


function mapStateToProps(state)
{
   let billingAddress =  _get(state,'AddressBookData.lookUpData.data.billingAddress',[]);
   let shippingAddress = _get(state,'AddressBookData.lookUpData.data.shippingAddress',[]);
   let updateAddressBook = _get(state, 'AddressBookData.lookUpData.data._links.updateAddressBook',{})
   let isLoading = _get(state,'AddressBookData.isFetching',false)
    return {
        billingAddress,shippingAddress,isLoading, updateAddressBook
    };
}

export default connect(mapStateToProps)(profileSideBarHoc(AddressBook))
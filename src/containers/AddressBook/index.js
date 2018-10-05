import React, { Component } from "react";
import { connect } from 'react-redux';
import profileSideBarHoc from '../../components/profileSideBarHoc'
import { getData } from '../../action/common/get';
import { postData } from '../../action/common/post';
import {showMessage} from '../../action/common';
import { REQUEST_ADDRESS_DATA, RECEIVED_ADDRESS_DATA, RECEIVED_ADDRESS_DATA_ERROR } from '../../constants/GetAddress'
import { APPLICATION_BFF_URL } from '../../constants/urlConstants';
import _get from 'lodash/get';
import DisplayAddress from './DisplayAddress/displayAddress';
import BillingAddress from '../Products/CheckOut/CheckoutAddresses/BillingAddress';
import { editAddress } from '../../action/editAddress'
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import Button from '@material-ui/core/Button';
function Transition(props) {
    return <Slide direction="up" {...props} />;
}

class AddressBook extends Component {
    constructor(props) {
        super(props);
        this.state = {
            editModeShipping: { open: false, index: null, addressType: '', initialValues: {} },
            editModeBilling: { open: false, index: null, addressType: '', initialValues: {} },
            openDeleteAddress: false,
            index: null,
            addressType: null
        }

    }

    handleEdit = (addressType, index) => {
        let initialValues = {}
        if (addressType == "billing") {
            initialValues = _get(this.props, `billingAddress.${index}`, []);
            console.log(initialValues, "initial Values is here")
            this.setState({ editModeBilling: { open: true, index: index, addressType: addressType, initialValues: initialValues } });
            this.props.dispatch(editAddress(initialValues))
        }
        else {
            initialValues = _get(this.props, `shippingAddress.${index}`, []);
            console.log(initialValues, "initial Values is here")

            this.setState({ editModeShipping: { open: true, index: index, addressType: addressType, initialValues: initialValues } });
            this.props.dispatch(editAddress(initialValues))

        }

    }


    getAddress = () => {
        let url = ''
        let options = {
            init: REQUEST_ADDRESS_DATA,
            success: RECEIVED_ADDRESS_DATA,
            error: RECEIVED_ADDRESS_DATA_ERROR
        }

        if (localStorage.getItem('role') == "company") {
            url = `${APPLICATION_BFF_URL}/businesscustomer/${localStorage.getItem('id')}/addressbook`
        }
        else {
            url = `${APPLICATION_BFF_URL}/customer/${localStorage.getItem('id')}/addressbook`
        }
        this.props.dispatch(getData(url, "", options))
        console.log(this.props.billingAddress, this.props.shippingAddress, this.props.updateAddressBook)
    }
    deleteHandler = (index, addressType) => {
        this.setState({ openDeleteAddress: true, index: index, addressType: addressType })
        console.log(index, "index is here");
        console.log(addressType, "addressType is here");
    }

    setEditOff = () => {
        this.setState({ editModeBilling: { open: false, initialValues: null, addressType: '' } });
        this.setState({ editModeShipping: { open: false, initialValues: null, addressType: '' } })

    }

    handleClose = () => {
        this.setState({ openDeleteAddress: false, index: null, addressType: null });
    };

    handleDelete = () => {
        let objectToDelete;
        let options = {
            init: 'INIT_DELETE_ADDRESS',
            success: 'SUCCESSFULLY_DELETED_ADDRESS',
            error: 'FAILED_DELETING_ADDRESS',
        }

        if (this.state.addressType == "billing") {
            objectToDelete = _get(this.props, `billingAddress.${this.state.index}`, []);
            objectToDelete.isActive = false
        }
        else if (this.state.addressType == 'shipping') {
            objectToDelete = _get(this.props, `shippingAddress.${this.state.index}`, []);
            objectToDelete.isActive = false


        }
        this.props.dispatch(postData(this.props.updateAddressBook.href, objectToDelete, null, options, this.props.updateAddressBook.verb)).then((success) => {
            console.log("Deleted Successfully", success);
            this.getAddress();
            this.props.dispatch(showMessage({text:'Your adddress has been deleted successfully.',isSuccess:true}));
            setTimeout(()=>{
                this.props.dispatch(showMessage({text:'',isSuccess:true}));

            },6000)
        })
        .catch((error)=>
        {
            this.props.dispatch(showMessage({text:error.message,isSuccess:false}));
            setTimeout(()=>{
                this.props.dispatch(showMessage({text:'',isSuccess:false}));

            },6000)
        })
        this.setState({ openDeleteAddress: false, index: null, addressType: null })
    }
    componentDidMount() {
        this.getAddress();
    }
    setPrimary = (data) => {
        console.log(data)
        let options = {
            init: 'INIT_UPDATEISPRIMARY_ADDRESS',
            success: 'SUCCESSFULLY_UPDATED_ISPRIMARY',
            error: 'FAILED_UPDATING_ISPRIMARY',
        }

        data.isPrimary = true

        this.props.dispatch(postData(this.props.updateAddressBook.href, data, null, options, this.props.updateAddressBook.verb)).then((success) => {
            console.log("IsPrimary updated Successfully", success);
            this.getAddress();
            this.props.dispatch(showMessage({text:'Address is set to primary',isSuccess:true}));
            setTimeout(()=>{
                this.props.dispatch(showMessage({text:'',isSuccess:true}));

            },6000)
        })
        .catch((error)=>
        {
            this.props.dispatch(showMessage({text:error.message,isSuccess:false}));
            setTimeout(()=>{
                this.props.dispatch(showMessage({text:'',isSuccess:false}));

            },6000)
        })
    }
    addressSaveHandler = () => {
        this.getAddress();
    }

    render() {
        let ShippingAddressBox = _get(this.props, 'shippingAddress', []).map((addField, index) => {
            return <DisplayAddress
                key={addField.id}
                isLoading={this.props.isLoading}
                addressType={addField.addressType}
                address={addField.address}
                city={addField.city}
                index={index}
                handleEdit={this.handleEdit}
                deleteHandler={this.deleteHandler}
                fullName={addField.fullName}
                state={addField.state}
                country={addField.country}
                zip={addField.zipCode}
                details={addField}
                setPrimary={this.setPrimary}
                showGreenCheck={addField.isPrimary} />
        })

        let BillingAddressBox = _get(this.props, 'billingAddress', []).map((addField, index) => {
            return <DisplayAddress
                key={addField.id}
                fullName={addField.fullName}
                handleEdit={this.handleEdit}
                deleteHandler={this.deleteHandler}
                index={index}
                isLoading={this.props.isLoading}
                addressType={addField.addressType}
                address={addField.address}
                city={addField.city}
                state={addField.state}
                country={addField.country}
                zip={addField.zipCode}
                details={addField}
                setPrimary={this.setPrimary}
                showGreenCheck={addField.isPrimary} />
        })
        return (
            <div className="staticProfile-box">
                <h2 className="cart-heading">Address Book</h2>
                <div className="row">
                    <div className="col-md-6">
                        <h3 className="addressbook-title">Shipping Address</h3>
                        {ShippingAddressBox}
                        <BillingAddress
                            setEditOff={this.setEditOff}
                            editMode={this.state.editMode}
                            onSaveFormData={this.addressSaveHandler}
                            openEdit={this.state.editModeShipping.open}
                            hideEmail={true}
                            addContactField={true}
                            addressType="shipping"
                            headerTitle="Shipping Address"
                        />
                    </div>
                    <div className="col-md-6">
                        <h3 className="addressbook-title">Billing Address</h3>
                        {BillingAddressBox}
                        <BillingAddress
                            setEditOff={this.setEditOff}
                            editMode={this.state.editMode}
                            openEdit={this.state.editModeBilling.open}
                            onSaveFormData={this.addressSaveHandler}
                            hideEmail={true}
                            addContactField={true}
                            addressType="billing"
                            headerTitle="Billing Address" />
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
                            {/* <h2 className="modal-title">{"Confirmation"}</h2> */}
                            <span className="modal-close2" onClick={this.handleClose}></span>
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
            </div>
        )
    }
}

function mapStateToProps(state) {
    let billingAddress = _get(state, 'AddressBookData.lookUpData.data.billingAddress', []);
    let shippingAddress = _get(state, 'AddressBookData.lookUpData.data.shippingAddress', []);
    let updateAddressBook = _get(state, 'AddressBookData.lookUpData.data._links.updateAddressBook', {})
    let isLoading = _get(state, 'AddressBookData.isFetching', false)
    return {
        billingAddress, shippingAddress, isLoading, updateAddressBook
    };
}

export default connect(mapStateToProps)(profileSideBarHoc(AddressBook))
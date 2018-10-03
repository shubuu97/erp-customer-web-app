import React,{Component} from "react";
import {connect} from 'react-redux';
import profileSideBarHoc from '../../components/profileSideBarHoc'
import {getData} from '../../action/common/get'
import {REQUEST_ADDRESS_DATA,RECEIVED_ADDRESS_DATA,RECEIVED_ADDRESS_DATA_ERROR} from '../../constants/GetAddress'
import {APPLICATION_BFF_URL} from '../../constants/urlConstants';
import _get from 'lodash/get';
import DisplayAddress from './DisplayAddress/displayAddress';
import BillingAddress from '../Products/CheckOut/CheckoutAddresses/BillingAddress';
import {editAddress} from '../../action/editAddress'

 class AddressBook extends Component
{
constructor(props)
{
    super(props);
    this.state = {editModeShipping:{open:false,index:null,addressType:'',initialValues:{}},
    editModeBilling:{open:false,index:null,addressType:'',initialValues:{}}
}

}

    handleEdit=(addressType,index)=>
    {
        let initialValues = {}
        if(addressType=="billing")
        {
        initialValues  =  _get(this.props,`billingAddress.${index}`,[]);
        console.log(initialValues,"initial Values is here")
        this.setState({editModeBilling:{open:true,index:index,addressType:addressType,initialValues:initialValues}});
        this.props.dispatch(editAddress(initialValues))
    }
        else
        {
            initialValues  =  _get(this.props,`shippingAddress.${index}`,[]);
            console.log(initialValues,"initial Values is here")

            this.setState({editModeShipping:{open:true,index:index,addressType:addressType,initialValues:initialValues}});
            this.props.dispatch(editAddress(initialValues))

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

 setEditOff=()=>
 {
     this.setState({editModeBilling:{open:false,initialValues:null,addressType:''}});
     this.setState({editModeShipping:{open:false,initialValues:null,addressType:''}})

 }

    render() {
      let ShippingAddressBox = _get(this.props,'shippingAddress',[]).map((addField,index) => {
            return <DisplayAddress 
                key={addField.id}
                isLoading={this.props.isLoading}
                addressType={addField.addressType}
                address={addField.address}
                city={addField.city}
                index={index}
                handleEdit={this.handleEdit}
                fullName={addField.fullName}
                state={addField.state}
                country={addField.country}
                zip={addField.zipCode} />
        })

        let BillingAddressBox = _get(this.props,'billingAddress',[]).map((addField,index) => {
            return <DisplayAddress 
                key={addField.id}
                fullName={addField.fullName}
                index={index}
                handleEdit={this.handleEdit}
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
                          setEditOff={this.setEditOff} 
                           editMode={this.state.editMode}
                            onSaveFormData={this.addressSaveHandler}
                            openEdit={this.state.editModeShipping.open} 
                            hideEmail={true} 
                            addContactField={true}
                            addressType="shipping" />
                    </div>
                    <div className="col-md-6">
                        <h3 className="addressbook-title">Billing Address</h3>
                        {BillingAddressBox}
                        <BillingAddress
                        setEditOff = {this.setEditOff}
                            editMode={this.state.editMode}
                            openEdit={this.state.editModeBilling.open} 
                            onSaveFormData={this.addressSaveHandler} 
                            hideEmail={true} 
                            addContactField={true} 
                            addressType="billing" />
                    </div>
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
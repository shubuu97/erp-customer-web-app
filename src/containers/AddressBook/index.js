import React,{Component} from "react";
import {connect} from 'react-redux';
import profileSideBarHoc from '../../components/profileSideBarHoc'
import {getData} from '../../action/common/get'
import {REQUEST_ADDRESS_DATA,RECEIVED_ADDRESS_DATA,RECEIVED_ADDRESS_DATA_ERROR} from '../../constants/GetAddress'
import {APPLICATION_BFF_URL} from '../../constants/urlConstants';
import _get from 'lodash/get';
import DisplayAddress from './DisplayAddress/displayAddress';
import BillingAddress from '../Products/CheckOut/CheckoutAddresses/BillingAddress';
import withLoader from '../../components/LoaderHoc'

 class AddressBook extends Component
{
    componentDidMount()
    {
        debugger;
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



    render() {
      let ShippingAddressBox = _get(this.props,'shippingAddress',[]).map(addField => {
            return <DisplayAddress 
                key={addField.id}
                isLoading={this.props.isLoading}
                addressType={addField.addressType}
                address={addField.address}
                city={addField.city}
                state={addField.state}
                country={addField.country}
                zip={addField.zipCode} />
        })

        let BillingAddressBox = _get(this.props,'billingAddress',[]).map(addField => {
            return <DisplayAddress 
                key={addField.id}
                isLoading={this.props.isLoading}
                addressType={addField.addressType}
                address={addField.address}
                city={addField.city}
                state={addField.state}
                country={addField.country}
                zip={addField.zipCode} />
        })
        return(
            <div style={{display:'flex',justifyContent:'center'}}>
              <BillingAddress/>
              {ShippingAddressBox}
              {BillingAddressBox}
            </div>
        )
    }
}


function mapStateToProps(state)
{
   let billingAddress =  _get(state,'AddressBookData.lookUpData.data.billingAddress',[]);
   let shippingAddress = _get(state,'AddressBookData.lookUpData.data.shippingAddress',[]);
   let isLoading = _get(state,'AddressBookData.isFetching',false)
    return {
        billingAddress,shippingAddress,isLoading
    };
}

export default connect(mapStateToProps)(profileSideBarHoc(AddressBook))
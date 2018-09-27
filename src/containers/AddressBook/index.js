import React,{Component} from "react";
import {connect} from 'react-redux'
import Progress from '../../components/common/Progress'
import profileSideBarHoc from '../../components/profileSideBarHoc'
import {getData} from '../../action/common/get'
import {REQUEST_ADDRESS_DATA,RECEIVED_ADDRESS_DATA,RECEIVED_ADDRESS_DATA_ERROR} from '../../constants/GetAddress'
import {APPLICATION_BFF_URL} from '../../constants/urlConstants';
import _get from 'lodash/get';
import DisplayAddress from './DisplayAddress/displayAddress';
import BillingAddress from '../Products/CheckOut/CheckoutAddresses/BillingAddress';

 class AddressBook extends Component
{
    componentDidMount()
    {let url=''
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

    addressBox = _get(this.props,'shippingAddress',[]).map(addField => {
        return <DisplayAddress 
        key={addField.id}
        address={addField.address}
        city={addField.city}
        state={addField.state}
        country={addField.country}
        zip={addField.zipCode} />
    })

    render() {
        return(
            <div style={{display:'flex',justifyContent:'center'}}>
             {this.addressBox}
             <BillingAddress/>
            </div>
        )
    }
}

AddressBook =  profileSideBarHoc(AddressBook);

function mapStateToProps(state)
{
   let billingAddress =  _get(state,'AddressBookData.lookUpData.data.billingAddress',[]);
   let shippingAddress = _get(state,'AddressBookData.lookUpData.data.shippingAddress',[])
    return {
        billingAddress,shippingAddress
    };
}

export default connect(mapStateToProps)(AddressBook)
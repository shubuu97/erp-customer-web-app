import React ,{Component} from 'react';
import BillingDetails from './BillingDetails';
import OrderDetails from './OrderDetails';
import ShippingDetails from './ShippingDetails'
export default class CheckOut extends Component
{
    render()
    {
        return(
            <div>
           Main Content will come here
            <BillingDetails/>
            <ShippingDetails/>
            <OrderDetails/>
            </div>
        )
    }
}
import React from 'react';
import Order from './order'
import OrderList from '.';
 import _get from 'lodash/get';
export default class Orders extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
   
    }
 
  }


  render() {
  let ordersList = {}
  let orderListHeader={}
  if( Array.isArray(this.props.orderListData)&&this.props.orderListData.length>0)
   {
  

        ordersList =  this.props.orderListData.map((order,index)=>
    {
     return  (<Order 
       key={index}
       placedDate={order.orderDate}
      id={order.id}
      handleTrack={this.props.handleTrack}
      trackingNumber={_get(order,'trackingNumber','')}
      shipper={_get(order,'shipper.name','')}
      payment={_get(order,'payment',{})}
      saleProducts={order.saleProducts}
      status={order.status}
      order={order}  />)
    })
  
   }
   else
   {
    ordersList =<div>No orders Yet...</div>
   }
   console.log(OrderList,"zzz")
return(
  <div>
    {ordersList}
  </div>
)

  
  }
}


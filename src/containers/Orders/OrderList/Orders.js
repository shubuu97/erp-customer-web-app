import React from 'react';
import Order from './order'
import OrderList from '.';
import { debug } from 'util';
 
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
      orderListHeader =
       <div>
       <span>id</span>
       <span>this.props.id</span>
       <span>Order Placed</span>
       <span>this.props.orderPlaced</span>
       <span>Order Total</span>
       <span>this.props.orderTotal</span>
       </div>

        ordersList =  this.props.orderListData.map((order,index)=>
    {
     return  (<Order 
       key={index}
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
   {Array.isArray(this.props.orderListData)?orderListHeader:null}
    {ordersList}
  </div>
)

  
  }
}


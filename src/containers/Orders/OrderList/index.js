
import React from 'react';
import { connect } from 'react-redux';
import * as OPTIONS from '../constants/OrderList';
import {postData} from '../../../action/common/post';
import OrderDetails from './Orders';
import profileSideBar from '../../../components/profileSideBarHoc';

class OrderContainer extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
   
    }
 
  }
   handleTrack=(order) =>{
     console.log("tracking order", order);
     let item = {
       payment: order.payment,
       customer: order.customer,
       status: order.status,
       supplier: order.supplier,
       orderDate: order.orderDate,
       orderId: order.id,
       trackingNumber: order.trackingNumber,
       shipper: order.shipper
      };
     localStorage.setItem('orderedItem',JSON.stringify(item));
     localStorage.setItem('orderId',order.id)
       this.props.history.push('/track')
     }
  componentDidMount()
  {
  let options = {
      init: OPTIONS.REQUEST_ORDER_LIST,
      success: OPTIONS.RECEIVED_ORDER_LIST,
      error: OPTIONS.RECEIVED_ORDER_LIST_ERROR
    }
    this.props.dispatch(postData(OPTIONS.ORDER_URL, {data:{customerId:localStorage.getItem('id')}},'Order_List', options));
    document.body.classList.add('order-history-page');
  }
  componentWillUnmount() {
    document.body.classList.remove('order-history-page');
  }

  render() {
    return (
      <div className="col-sm-9">
      <OrderDetails
      orderListData={this.props.orderListData.data}
      handleTrack={this.handleTrack} />
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {orderListData:state.OrderListData.orderListData};
}

export default connect(mapStateToProps)(profileSideBar(OrderContainer))

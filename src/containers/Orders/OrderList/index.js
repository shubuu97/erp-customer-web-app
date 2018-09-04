import React from 'react';
import { connect } from 'react-redux';
import * as OPTIONS from '../constants/OrderList';
import {postData} from '../action/post';
import OrderDetails from './Orders';

class OrderContainer extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
   
    }
 
  }
  handleTrack=(id) =>{
    this.props.history.push({pathname: '/track',
    
    state: { id : id }})
  }

  

  componentDidMount()
  {
  let options = {
      init: OPTIONS.REQUEST_ORDER_LIST,
      success: OPTIONS.RECEIVED_ORDER_LIST,
      error: OPTIONS.RECEIVED_ORDER_LIST_ERROR
    }
    this.props.dispatch(postData(OPTIONS.ORDER_URL, {data:{customerId:localStorage.getItem('id')}},'Order_List', options));
  }

  render() {
    return (
      <div className="container">
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

export default connect(mapStateToProps)(OrderContainer)

import React from 'react';
import Order from './order'
import OrderList from '.';
import _get from 'lodash/get';
import withLoader from '../../../components/LoaderHoc';
class Orders extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }


  render() {
    let ordersList = {}
    let orderListHeader = {}
    if (Array.isArray(this.props.orderListData) && this.props.orderListData.length > 0) {
      ordersList = this.props.orderListData.map((order, index) => {
        return (<Order
          key={index}
          placedDate={order.orderDate}
          id={order.displayId  || order.id}
          handleTrack={this.props.handleTrack}
          onCancelOrder={this.props.onCancelOrder}
          trackingNumber={_get(order, 'trackingNumber', '')}
          shipper={_get(order, 'shipper.name', '')}
          payment={_get(order, 'payment', {})}
          saleProducts={order.saleProducts}
          status={order.status}
          goToProductDetails={this.props.goToProductDetails}
          order={order} />)
      })
    }
    else {
      ordersList = <div className="no-order">No orders Yet...</div>
    }
    return (
      <div>
        {ordersList}
      </div>
    )
  }
}

export default withLoader(Orders);
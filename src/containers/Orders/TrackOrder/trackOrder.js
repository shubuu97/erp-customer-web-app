import React from 'react';
export default class TrackOrders extends React.Component {
  render() {
    const { orderDetails, orderHistoryList } = this.props;
    const renderHistroyData = () => orderHistoryList.map(data => {
      return (
        <div className={`to-content-row ${data.isActive ? 'active' : ''}`}>
          <div className="to-content-img">
            <img src={data.imgUrl} alt={data.displayName} />
          </div>
          <div className="to-border"></div>
          <div className="to-status">
            <span>{data.displayName}</span>
            <span>{data.historyDate}</span>
          </div>
        </div>
      )
    })

    return (<div className="trackorder-container">
      <div className="track-order-detail">
        <div className="track-d trackorder-id">
          <label>Order Id :</label>
          <span>#{orderDetails.orderId}</span>
        </div>
        {orderDetails.shippingAddress && <div className="track-d trackorder-id t-address"><label>Shipping Address :</label><span>{orderDetails.shippingAddress.line1}, {orderDetails.shippingAddress.city}, {orderDetails.shippingAddress.state}, {orderDetails.shippingAddress.country}- {orderDetails.shippingAddress.zipCode}</span></div>}
        {orderDetails.billingAddress && <div className="track-d trackorder-id t-address"><label>Billing Address :</label><span>{orderDetails.billingAddress.line1}, {orderDetails.billingAddress.city}, {orderDetails.billingAddress.state}, {orderDetails.billingAddress.country}- {orderDetails.billingAddress.zipCode}</span></div>}
      </div>
      <div className="to-content">
        <div className="to-content-box">
          {renderHistroyData()}
        </div>
      </div>
    </div >)
  }
}

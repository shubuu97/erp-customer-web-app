import React from 'react';
import placedOn from './../../../assets/images/to1.png';
import confirmationStatus from './../../../assets/images/accepted.png';
import processing from './../../../assets/images/in-progress.png';
import partdispatch from './../../../assets/images/part-dispatched.png';
import dispatch from './../../../assets/images/dispatched.png';
import partPack from './../../../assets/images/part-packaged.png';
import packagd from './../../../assets/images/packaged.png';
import shipped from './../../../assets/images/to5.png';
import transit from './../../../assets/images/to6.png';
import partdelivered from './../../../assets/images/part-delivered.png';
import delivered from './../../../assets/images/delivered.png';

export default class TrackOrders extends React.Component {
  render() {
    console.log(this.props.displayId, 'shubham')
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
          <span>#{this.props.displayId}</span>
        </div>
        {orderDetails.shippingAddress && <div className="track-d trackorder-id t-address"><label>Shipping Address :</label><span>{orderDetails.shippingAddress.line1}, {orderDetails.shippingAddress.city}, {orderDetails.shippingAddress.state}, {orderDetails.shippingAddress.country}- {orderDetails.shippingAddress.zipCode}</span></div>}
        {orderDetails.billingAddress && <div className="track-d trackorder-id t-address"><label>Billing Address :</label><span>{orderDetails.billingAddress.line1}, {orderDetails.billingAddress.city}, {orderDetails.billingAddress.state}, {orderDetails.billingAddress.country}- {orderDetails.billingAddress.zipCode}</span></div>}
      </div>
      <div className="to-content">
        <div className="to-content-box">
          {renderHistroyData()}
          {orderDetails.status == 'ACCEPTED' ? <div className={`to-content-row`}>
            <div className="to-content-img">
              <img src={processing} alt={'inprogress'} />
            </div>
            <div className="to-border"></div>
            <div className="to-status">
              <span>IN PROGRESS</span>
              <span>Will be updated soon</span>
            </div>
          </div>: null}
          {orderDetails.status == 'ACCEPTED' || orderDetails.status == 'IN_PROGRESS' ?<div className={`to-content-row`}>
            <div className="to-content-img">
              <img src={packagd} alt={'packagd'} />
            </div>
            <div className="to-border"></div>
            <div className="to-status">
              <span>ORDER PACKAGED</span>
              <span>Will be updated soon</span>
            </div>
          </div>: null}
          {orderDetails.status == 'ACCEPTED' || orderDetails.status == 'IN_PROGRESS' || orderDetails.status == 'PACKAGED' ?<div className={`to-content-row`}>
            <div className="to-content-img">
              <img src={dispatch} alt={'dispatch'} />
            </div>
            <div className="to-border"></div>
            <div className="to-status">
              <span>ORDER DISPATCHED</span>
              <span>Will be updated soon</span>
            </div>
          </div>: null}
          {orderDetails.status == 'ACCEPTED' || orderDetails.status == 'IN_PROGRESS' || orderDetails.status == 'PACKAGED' || orderDetails.status == 'DISPATCHED' ?<div className={`to-content-row`}>
            <div className="to-content-img">
              <img src={transit} alt={'dispatch'} />
            </div>
            <div className="to-border"></div>
            <div className="to-status">
              <span>IN TRANSIT</span>
              <span>Will be updated soon</span>
            </div>
          </div>: null}
          {orderDetails.status == 'ACCEPTED' || orderDetails.status == 'IN_PROGRESS' || orderDetails.status == 'PACKAGED' || orderDetails.status == 'DISPATCHED' || orderDetails.status == 'IN_TRANSIT' ?<div className={`to-content-row`}>
            <div className="to-content-img">
              <img src={delivered} alt={'dispatch'} />
            </div>
            <div className="to-border"></div>
            <div className="to-status">
              <span>ORDER DELIVERED</span>
              <span>Will be updated soon</span>
            </div>
          </div>: null}
          


          {/* PART PACKAGE */}

          {orderDetails.status == 'PART_PACKAGED' ?<div className={`to-content-row`}>
            <div className="to-content-img">
              <img src={partdispatch} alt={'dispatch'} />
            </div>
            <div className="to-border"></div>
            <div className="to-status">
              <span>PART DISPATCHED</span>
              <span>Will be updated soon</span>
            </div>
          </div>: null}
          {orderDetails.status == 'PART_PACKAGED' || orderDetails.status == 'PART_DISPATCHED' ?<div className={`to-content-row`}>
            <div className="to-content-img">
              <img src={transit} alt={'dispatch'} />
            </div>
            <div className="to-border"></div>
            <div className="to-status">
              <span>IN TRANSIT</span>
              <span>Will be updated soon</span>
            </div>
          </div>: null}
          {orderDetails.status == 'PART_PACKAGED' || orderDetails.status == 'PART_DISPATCHED' || orderDetails.status == 'IN_TRANSIT' ?<div className={`to-content-row`}>
            <div className="to-content-img">
              <img src={delivered} alt={'dispatch'} />
            </div>
            <div className="to-border"></div>
            <div className="to-status">
              <span>ORDER DELIVERED</span>
              <span>Will be updated soon</span>
            </div>
          </div>: null}
        </div>
      </div>
    </div >)
  }
}

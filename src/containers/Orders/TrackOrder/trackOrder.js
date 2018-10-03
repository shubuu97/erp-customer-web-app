import React from 'react';
import { connect } from 'react-redux';
import placedOn from './../../../assets/images/to1.png';
import confirmationStatus from './../../../assets/images/to2.png';
import processing from './../../../assets/images/to3.png';
import dispatch from './../../../assets/images/to4.png';
import shipped from './../../../assets/images/to5.png';
import transit from './../../../assets/images/to6.png';
import delivered from './../../../assets/images/to7.png';
import moment from 'moment';
export default class TrackOrders extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        }

    }


    render() {
        const { orderDetails } = this.props;
        return (<div className="trackorder-container">
            <div className="track-order-detail">
                <div className="track-d trackorder-id">
                    <label>Order Id :</label>
                    <span>#{orderDetails.orderId}</span>
                </div>
                {orderDetails.trackingNumber && <div className="track-d trackorder-num">
                    <label>Tracking Number :</label>
                    <span>#{orderDetails.trackingNumber}</span>
                </div>}
                {orderDetails.trackingNumber && <div className="track-order-desc">
                    <p>You can track your order from <a href={orderDetails.shipper && orderDetails.shipper.url} target="_blank">{orderDetails.shipper && orderDetails.shipper.name}</a> website with your tracking number.</p>
                </div>}
            </div>
            <div className="to-content">
                <div className="to-content-box">
                    <div className="to-content-row active">
                        <div className="to-content-img">
                            <img src={placedOn} />
                        </div>
                        <div className="to-border"></div>
                        <div className="to-status">
                            <label>Placed On</label>
                            <span>{moment(orderDetails.orderDate).format('DD MMMM YYYY')}, 04:30 PM GMT</span>

                        </div>
                    </div>
                    <div className="to-content-row active">
                        <div className="to-content-img">
                            <img src={confirmationStatus} />
                        </div>
                        <div className="to-border"></div>
                        <div className="to-status">
                            <label>Confirmation Status</label>
                            <span>{orderDetails.status}</span>
                        </div>
                    </div>
                    <div className="to-content-row">
                        <div className="to-content-img">
                            <img src={processing} />
                        </div>
                        <div className="to-border"></div>
                        <div className="to-status">
                            <label>Processing</label>
                            <span>will be update soon</span>
                        </div>
                    </div>
                    <div className="to-content-row">
                        <div className="to-content-img">
                            <img src={dispatch} />
                        </div>
                        <div className="to-border"></div>
                        <div className="to-status">
                            <label>Ready to Dispatch</label>
                            <span>will be update soon</span>
                        </div>
                    </div>
                    <div className="to-content-row">
                        <div className="to-content-img">
                            <img src={shipped} />
                        </div>
                        <div className="to-border"></div>
                        <div className="to-status">
                            <label>Shipped</label>
                            <span>will be update soon</span>
                        </div>
                    </div>
                    <div className="to-content-row">
                        <div className="to-content-img">
                            <img src={transit} />
                        </div>
                        <div className="to-border"></div>
                        <div className="to-status">
                            <label>In Transit</label>
                            <span>will be update soon</span>
                        </div>
                    </div>
                    <div className="to-content-row">
                        <div className="to-content-img">
                            <img src={delivered} />
                        </div>
                        <div className="to-border"></div>
                        <div className="to-status">
                            <label>Delivered</label>
                            <span>will be update soon</span>
                        </div>
                    </div>
                </div>

            </div>
        </div>)

    }

}

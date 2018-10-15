import React from 'react';
import { connect } from 'react-redux';
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
                {/* {orderDetails.trackingNumber && <div className="track-d trackorder-num">
                    <label>Tracking Number :</label>
                    <span>#{orderDetails.trackingNumber}</span>
                </div>}
                {orderDetails.trackingNumber && <div className="track-order-desc">
                    <p>You can track your order from <a href={orderDetails.shipper && orderDetails.shipper.url} target="_blank">{orderDetails.shipper && orderDetails.shipper.name}</a> website with your tracking number.</p>
                </div>} */}
                {orderDetails.shippingAddress && <div className="track-d trackorder-id t-address"><label>Shipping Address :</label><span>{orderDetails.shippingAddress.line1}, {orderDetails.shippingAddress.city}, {orderDetails.shippingAddress.state}, {orderDetails.shippingAddress.country}- {orderDetails.shippingAddress.zipCode}</span></div>}

                {orderDetails.billingAddress && <div className="track-d trackorder-id t-address"><label>Billing Address :</label><span>{orderDetails.billingAddress.line1}, {orderDetails.billingAddress.city}, {orderDetails.billingAddress.state}, {orderDetails.billingAddress.country}- {orderDetails.billingAddress.zipCode}</span></div>}
            </div>
            <div className="to-content">
                <div className="to-content-box">
                    <div className="to-content-row active">
                        <div className="to-content-img">
                            <img src={placedOn} />
                        </div>
                        <div className="to-border"></div>
                        <div className="to-status">
                            <span>{this.props.placedOn.displayName ? this.props.placedOn.displayName : ''}</span>
                            <span>{this.props.placedOn.date ? moment(this.props.placedOn.date).format('DD MM YYYY, hh:mm: a'): 'will be update soon'}</span>

                        </div>
                    </div>
                    <div className="to-content-row active">
                        <div className="to-content-img">
                            <img src={confirmationStatus} />
                        </div>
                        <div className="to-border"></div>
                        <div className="to-status">
                            <span>{this.props.accepted.displayName ? this.props.accepted.displayName : ''}</span>
                            <span>{this.props.accepted.date ? moment(this.props.accepted.date).format('DD MM YYYY, hh:mm: a') : null}</span>
                        </div>
                    </div>
                    <div className="to-content-row">
                        <div className="to-content-img">
                            <img src={processing} />
                        </div>
                        <div className="to-border"></div>
                        <div className="to-status">
                            <span>{this.props.processing.displayName ? this.props.processing.displayName : 'IN PROGRESS'}</span>
                            <span>{this.props.processing.date ? moment(this.props.processing.date).format('DD MM YYYY, hh:mm: a'): 'will be update soon'}</span>
                        </div>
                    </div>
                   {this.props.partPackaged.isTrue ? <div className="to-content-row">
                        <div className="to-content-img">
                            <img src={partPack} />
                        </div>
                        <div className="to-border"></div>
                        <div className="to-status">
                            <label>{this.props.partPackaged.displayName }</label>
                            <span>{this.props.partPackaged.date ? moment(this.props.partPackaged.date).format('DD MM YYYY, hh:mm: a') : 'will be update soon'}</span>
                        </div>
                    </div> : null}
                    {<div className="to-content-row">
                        <div className="to-content-img">
                            <img src={packagd} />
                        </div>
                        <div className="to-border"></div>
                        <div className="to-status">
                            <label>{this.props.packaged.displayName || 'PACKAGED'}</label>
                            <span>{this.props.packaged.date ? moment(this.props.packaged.date).format('DD MM YYYY, hh:mm: a') : 'will be update soon'}</span>
                        </div>
                    </div>}
                    {this.props.partDispatched.isTrue ? <div className="to-content-row">
                        <div className="to-content-img">
                            <img src={partdispatch} />
                        </div>
                        <div className="to-border"></div>
                        <div className="to-status">
                            <label>{this.props.partDispatched.displayName}</label>
                            <span>{this.props.partDispatched.date ? moment(this.props.partDispatched.date).format('DD MM YYYY, hh:mm: a') : 'will be update soon'}</span>
                        </div>
                    </div> : null}
                    {<div className="to-content-row">
                        <div className="to-content-img">
                            <img src={dispatch} />
                        </div>
                        <div className="to-border"></div>
                        <div className="to-status">
                            <label>{this.props.dispatched.displayName || 'DISPATCHED'}</label>
                            <span>{this.props.dispatched.date ? moment(this.props.placed.date).format('DD MM YYYY, hh:mm: a') : 'will be update soon'}</span>
                        </div>
                    </div>}
                    <div className="to-content-row">
                        <div className="to-content-img">
                            <img src={transit} />
                        </div>
                        <div className="to-border"></div>
                        <div className="to-status">
                            <label>{this.props.inTransit.displayName || 'IN TRANSIT'}</label>
                            <span>{this.props.inTransit.date ? moment(this.props.inTransit.date).format('DD MM YYYY, hh:mm: a') : 'will be update soon' }</span>
                        </div>
                    </div>
                   {this.props.partDelivered.isTrue ? <div className="to-content-row">
                        <div className="to-content-img">
                            <img src={partdelivered} />
                        </div>
                        <div className="to-border"></div>
                        <div className="to-status">
                            <label>{this.props.partDelivered.displayName}</label>
                            <span>{this.props.partDelivered.date ? moment(this.props.partDelivered.date).format('DD MM YYYY, hh:mm: a') : 'will be update soon' }</span>
                        </div>
                    </div> : null}
                    {<div className="to-content-row">
                        <div className="to-content-img">
                            <img src={delivered} />
                        </div>
                        <div className="to-border"></div>
                        <div className="to-status">
                            <label>{this.props.delivered.displayName || 'DELIVERED'}</label>
                            <span>{this.props.delivered.date ? moment(this.props.delivered.date).format('DD MM YYYY, hh:mm: a') : 'will be update soon' }</span>
                        </div>
                    </div> }
                </div>

            </div>
        </div >)

    }

}

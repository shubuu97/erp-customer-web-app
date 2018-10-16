import React from 'react';
import { connect } from 'react-redux';
import TrackOrder from './trackOrder';
import Button from '@material-ui/core/Button'

export default class TrackOrders extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      placedOn: {
        date: null,
        displayName: ''
      },
      accepted: {
        date: null,
        displayName: ''
      },
      processing: {
        date: null,
        displayName: ''
      },
      partPackaged: {
        date: null,
        displayName: '',
        isTrue: false
      },
      packaged: {
        date: null,
        displayName: ''
      },
      partDispatched: {
        date: null,
        displayName: ''
      },
      dispatched: {
        date: null,
        displayName: ''
      },
      inTransit: {
        date: null,
        displayName: ''
      },
      partDelivered: {
        date: null,
        displayName: ''
      },
      delivered: {
        date: null,
        displayName: ''
      }
    }
  }
  componentWillMount() {
    const {orderDetails, trackData} = this.props;
    trackData.map(data => {
      if (data.status == 'INCOMING') {
        this.setState({ placedOn: { date: data.modifiedDate, displayName: 'PLACED ON' } })
      }
      else if (data.status == 'ACCEPTED') {
        this.setState({ accepted: { date: data.modifiedDate, displayName: 'ACCEPTED ON' } })
      }
      else if (data.status == 'IN_PROGRESS') {
        this.setState({ processing: { date: data.modifiedDate, displayName: 'IN PROGRESS' } })
      }
      else if (data.status == 'PART_PACKAGED') {
        this.setState({ partPackaged: { date: data.modifiedDate, displayName: 'PART PACKAGED.', isTrue: true } })
      }
      else if (data.status == 'PACKAGED') {
        this.setState({ packaged: { date: data.modifiedDate, displayName: 'ORDER PACKAGED' } })
      }
      else if (data.status == 'PART_DISPATCHED') {
        this.setState({ partDispatched: { date: data.modifiedDate, displayName: 'PART DISPATCHED' } })
      }
      else if (data.status == 'DISPATCHED') {
        this.setState({ dispatched: { date: data.modifiedDate, displayName: 'ORDER DISPATCHED' } })
      }
      else if (data.status == 'IN_TRANSIT') {
        this.setState({ inTransit: { date: data.modifiedDate, displayName: 'OUT FOR DELIVERY' } })
      }
      else if (data.status == 'PART_DELIVERED') {
        this.setState({ partDelivered: { date: data.modifiedDate, displayName: 'PART DELIVERED' } })
      }
      else if (data.status == 'DELIVERED') {
        this.setState({ delivered: { date: data.modifiedDate, displayName: 'ORDER DELIVERED' } })
      }
    })
  }

  render() {
    const {orderDetails, trackData} = this.props;
    
    return (
      <div>
        <a className="back-history" onClick={()=>this.props.history.push('/orders')}><i class="fa fa-reply"></i> Back to My Orders</a>
        <h2 className="cart-heading">History Details</h2>
        <div>
          <TrackOrder 
              orderDetails={orderDetails} 
              trackData={trackData}
              placedOn={this.state.placedOn}
              accepted={this.state.accepted}
              processing={this.state.processing}
              partPackaged={this.state.partPackaged}
              packaged={this.state.packaged}
              partDispatched={this.state.partDispatched}
              dispatched={this.state.dispatched}
              inTransit={this.state.inTransit}
              partDelivered={this.state.partDelivered}
              delivered={this.state.delivered}
            />
        </div>
      </div>)
  }
}

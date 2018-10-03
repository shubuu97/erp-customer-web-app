import React from 'react';
import { connect } from 'react-redux';
import TrackOrder from './trackOrder';
import Button from '@material-ui/core/Button'

export default class TrackOrders extends React.Component {
  constructor(props) {
    super(props);
    this.state = {}
  }
  render() {
    let TrackOrderdata;
    const {orderDetails} = this.props;
    if (Array.isArray(this.props.trackData) && this.props.trackData.length) {
      TrackOrderdata = this.props.trackData.map((track) => {
        return (
          <div>
            <TrackOrder />
          </div>)
      })
    } else {
      TrackOrderdata = <div>No history yet    </div>
    }
    return (
      <div>
        <a className="back-history" onClick={()=>this.props.history.push('/orders')}><i class="fa fa-reply"></i> Back to My Orders</a>
        <h2 className="cart-heading">History Details</h2>
        <div>
          <TrackOrder orderDetails={orderDetails}/>
        </div>
      </div>)
  }
}

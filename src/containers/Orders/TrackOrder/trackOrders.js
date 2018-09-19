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
        <Button color="primary" variant="contained" onClick={()=>this.props.history.push('/orders')}>Back</Button>
        <h2 className="cart-heading">Track Order</h2>
        <div>
          <TrackOrder orderDetails={orderDetails}/>
        </div>
      </div>)
  }
}

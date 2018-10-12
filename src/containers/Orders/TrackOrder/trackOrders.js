import React from 'react';
import { connect } from 'react-redux';
import TrackOrder from './trackOrder';
import Button from '@material-ui/core/Button'

export default class TrackOrders extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      placed: {
        date: null
      },
      accepted: {
        date: null
      },
      partPackaged: {
        date: null
      },
      part: {
        date: null
      }
    }
  }
  componentWillMount() {
    const {orderDetails, trackData} = this.props;
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
            />
        </div>
      </div>)
  }
}

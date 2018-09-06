

import React from 'react';
import { connect } from 'react-redux';
import * as OPTIONS from '../constants/OrderList';
import TrackOrders from './trackOrders';
import { APPLICATION_BFF_URL } from '../../../constants/urlConstants';
import { fetchTrackData } from '../action/getTrack';

class TrackOrderContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    }

  }
  componentDidMount() {
    if (localStorage.getItem('orderId'))
      this.props.dispatch(fetchTrackData(`${APPLICATION_BFF_URL}/customer/orders/${localStorage.getItem("id")}/history`, ''))
    else
      this.props.history.push('/orders')
    document.body.classList.add('track-order-page');
  }
  componentWillUnmount() {
    document.body.classList.remove('track-order-page');
  }

  render() {
    return (
      <div className="container">
        <TrackOrders
          trackData={this.props.trackData.data}
        />
      </div>
    )
  }
}

function mapStateToProps(state) {
  return { trackData: state.TrackData.trackData };
}

export default connect(mapStateToProps)(TrackOrderContainer)
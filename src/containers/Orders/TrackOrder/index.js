

import React from 'react';
import { connect } from 'react-redux';
import * as OPTIONS from '../constants/OrderList';
import TrackOrders from './trackOrders';
import { APPLICATION_BFF_URL } from '../../../constants/urlConstants';
import { fetchTrackData } from '../action/getTrack';
import profileSideBar from '../../../components/profileSideBarHoc';
import {get} from 'lodash';

class TrackOrderContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      item:{}
    }

  }
  componentDidMount() {
    if (localStorage.getItem('orderId'))
      this.props.dispatch(fetchTrackData(`${APPLICATION_BFF_URL}/customer/orders/${localStorage.getItem("orderId")}/history`, ''))
    else
      this.props.history.push('/orders')

      if(localStorage.getItem('orderedItem')){
        let item = JSON.parse(localStorage.getItem('orderedItem'));
        this.setState({item});
      }
    document.body.classList.add('track-order-page');
  }
  componentWillUnmount() {
    document.body.classList.remove('track-order-page');
  }

  render() {
    return (
      <div>
        <TrackOrders
          trackData={get(this.props, 'trackData.data', {})}
          orderDetails={this.state.item}
          history={this.props.history}
        />
      </div>
    )
  }
}

function mapStateToProps(state) {
  return { trackData: state.TrackData.trackData };
}

export default connect(mapStateToProps)(profileSideBar(TrackOrderContainer))
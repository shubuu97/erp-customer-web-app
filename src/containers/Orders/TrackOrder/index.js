

import React from 'react';
import { connect } from 'react-redux';
import * as OPTIONS from '../constants/OrderList';
import TrackOrders from './trackOrders';
import { APPLICATION_BFF_URL } from '../../../constants/urlConstants';
import { fetchTrackData } from '../action/getTrack';
import profileSideBar from '../../../components/profileSideBarHoc';
import {get, isEmpty} from 'lodash';

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
        console.log("In track order udpates",item, this.state.item);
        this.setState({item});
      }
    document.body.classList.add('track-order-page');
  }
  componentWillUnmount() {
    document.body.classList.remove('track-order-page');
    this.setState({item: {}});
  }

  render() {
    console.log(this.state.item);
    return (
      <div>
       {get(this.props, 'trackData.data') && !isEmpty(this.state.item) && !this.props.isFetching ? <TrackOrders
          trackData={get(this.props, 'trackData.data', {})}
          orderDetails={this.state.item}
          history={this.props.history}
        />:null}
      </div>
    )
  }
}

function mapStateToProps(state) {
  let isFetching= state.TrackData.isFetching;
  return { trackData: state.TrackData.trackData, isFetching };
}

export default connect(mapStateToProps)(profileSideBar(TrackOrderContainer))
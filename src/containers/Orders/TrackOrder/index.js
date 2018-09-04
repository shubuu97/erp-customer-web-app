
import React from 'react';
import { connect } from 'react-redux';
import * as OPTIONS from '../constants/OrderList';
import {postData} from '../action/post';
import TrackOrder from './trackOrder';
import {APPLICATION_BFF_URL} from '../../../constants/urlConstants';
import { fetchTrackData } from '../action/getTrack';

class TrackOrderContainer extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
   
    }
 
  }
  componentDidMount()
  {
this.props.dispatch(fetchTrackData(`${APPLICATION_BFF_URL}/customer/orders/${this.props.location.state.id}/history`,''))
  }

  render() {
    return (
      <div className="container">
      <TrackOrder
    //   trackData={this.props.trackData.data}
    />
      </div>
    )
  }
}

function mapStateToProps(state) {
  return //{trackData:state.TrackData.trackData};
}

export default connect(mapStateToProps)(TrackOrderContainer)

import React from 'react';
import { connect } from 'react-redux';
import TrackOrder from './trackOrder';
import Button from '@material-ui/core/Button'
import moment from 'moment';
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
import {sortBy} from 'lodash';

export default class TrackOrders extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      orderHistoryList:[]
    }
  }
  componentWillMount() {
    let currentOrderStatus = '';
    const {trackData} = this.props;
    let orderHistoryList = [];
    trackData.map(data => {
      currentOrderStatus = data.status

      if (data.status == 'INCOMING') {
        let orderObj = {
          imgUrl: placedOn,
          displayName: 'PLACED ON',
          historyDate: moment(data.modifiedDate).format('DD MM YYYY, hh:mm: a'),
          isActive: true
        }
        orderHistoryList.push(orderObj);
      }
      else if (data.status == 'ACCEPTED') {
        let orderObj = {
          imgUrl: confirmationStatus,
          displayName: 'ACCEPTED ON',
          historyDate: moment(data.modifiedDate).format('DD MM YYYY, hh:mm: a'),
          isActive: true
        }
        orderHistoryList.push(orderObj);
      }
      else if (data.status == 'IN_PROGRESS') {
        let orderObj = {
          imgUrl: processing,
          displayName: 'IN PROGRESS',
          historyDate: moment(data.modifiedDate).format('DD MM YYYY, hh:mm: a'),
          isActive: true
        }
        orderHistoryList.push(orderObj);
      }
      else if (data.status == 'PART_PACKAGED') {
        let orderObj = {
          imgUrl: partPack,
          displayName: 'PART PACKAGED',
          historyDate: moment(data.modifiedDate).format('DD MM YYYY, hh:mm: a'),
          isActive: true
        }
        orderHistoryList.push(orderObj);
      }
      else if (data.status == 'PACKAGED') {
        let orderObj = {
          imgUrl: packagd,
          displayName: 'ORDER PACKAGED',
          historyDate: moment(data.modifiedDate).format('DD MM YYYY, hh:mm: a'),
          isActive: true
        }
        orderHistoryList.push(orderObj);
      }
      else if (data.status == 'PART_DISPATCHED') {
        let orderObj = {
          imgUrl: partdispatch,
          displayName: 'PART DISPATCHED',
          historyDate: moment(data.modifiedDate).format('DD MM YYYY, hh:mm: a'),
          isActive: true
        }
        orderHistoryList.push(orderObj);
      }
      else if (data.status == 'DISPATCHED') {
        let orderObj = {
          imgUrl: partdispatch,
          displayName: 'ORDER DISPATCHED',
          historyDate: moment(data.modifiedDate).format('DD MM YYYY, hh:mm: a'),
          isActive: true
        }
        orderHistoryList.push(orderObj);
      }
      else if (data.status == 'IN_TRANSIT') {
        let orderObj = {
          imgUrl: transit,
          displayName: 'OUT FOR DELIVERY',
          historyDate: moment(data.modifiedDate).format('DD MM YYYY, hh:mm: a'),
          isActive: true
        }
        orderHistoryList.push(orderObj);
      }
      else if (data.status == 'PART_DELIVERED') {
        let orderObj = {
          imgUrl: partdelivered,
          displayName: 'PART DELIVERED',
          historyDate: moment(data.modifiedDate).format('DD MM YYYY, hh:mm: a'),
          isActive: true
        }
        orderHistoryList.push(orderObj);
      }
      else if (data.status == 'DELIVERED') {
        let orderObj = {
          imgUrl: delivered,
          displayName: 'ORDER DELIVERED',
          historyDate: moment(data.modifiedDate).format('DD MM YYYY, hh:mm: a'),
          isActive: true
        }
        orderHistoryList.push(orderObj);
      }
    })
    orderHistoryList = sortBy(orderHistoryList, 'historyDate');
    const orderStatus = ['IN_PROGRESS', 'PACKAGED', 'DISPATCHED', 'IN_TRANSIT', 'DELIVERED']
    const orderStatusPart = ['IN_PROGRESS', 'PART_PACKAGED', 'PART_DISPATCHED', 'IN_TRANSIT', 'PART_DELIVERED']
    orderStatus.map(order => {
      
    })
    orderHistoryList.push()
    this.setState({orderHistoryList});
  }

  render() {
    const {orderDetails, trackData} = this.props;
    const {orderHistoryList} = this.state;
    
    return (
      <div>
        <a className="back-history" onClick={()=>this.props.history.push('/orders')}><i class="fa fa-reply"></i> Back to My Orders</a>
        <h2 className="cart-heading">History Details</h2>
        <div>
          <TrackOrder 
              orderDetails={orderDetails} 
              trackData={trackData}
              orderHistoryList={orderHistoryList}
            />
        </div>
      </div>)
  }
}

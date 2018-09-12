
import React from 'react';
import { connect } from 'react-redux';
import * as OPTIONS from '../constants/OrderList';
import { postData } from '../../../action/common/post';
import OrderDetails from './Orders';
import profileSideBar from '../../../components/profileSideBarHoc';
import FilterHoc from './OrderFilterHoc';
import _get from 'lodash/get';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import Button from '@material-ui/core/Button';
import { APPLICATION_BFF_URL } from '../../../constants/urlConstants';
import { showMessage } from '../../../action/common';

function Transition(props) {
  return <Slide direction="up" {...props} />;
}

class OrderContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      openCancelOrder: false,
      readyForCancel: {}
    }

  }
  handleTrack = (order) => {
    console.log("tracking order", order);
    let item = {
      payment: order.payment,
      customer: order.customer,
      status: order.status,
      supplier: order.supplier,
      orderDate: order.orderDate,
      orderId: order.id,
      trackingNumber: order.trackingNumber,
      shipper: order.shipper
    };
    localStorage.setItem('orderedItem', JSON.stringify(item));
    localStorage.setItem('orderId', order.id)
    this.props.history.push('/track')
  }
  componentDidMount() {
    let options = {
      init: OPTIONS.REQUEST_ORDER_LIST,
      success: OPTIONS.RECEIVED_ORDER_LIST,
      error: OPTIONS.RECEIVED_ORDER_LIST_ERROR
    }
    this.props.dispatch(postData(OPTIONS.ORDER_URL, { data: { customerId: localStorage.getItem('id') } }, 'Order_List', options));
    document.body.classList.add('order-history-page');
  }
  componentWillUnmount() {
    document.body.classList.remove('order-history-page');
  }
  onCancelOrder = (order) => {
    console.log("On cancel order", order);
    this.setState({ openCancelOrder: true, readyForCancel: order });
  }

  handleClose = () => {
    this.setState({ openCancelOrder: false });
  };
  cancelOrder = () => {
    let options = {
      init: 'REQUEST_CANCEL_ORDER',
      success: 'RECEIVED_CANCEL_ORDER',
      error: 'RECEIVED_CANCEL_ORDER_ERROR'
    }
    let cancelUrl = _get(this.state, 'readyForCancel._links.cancelOrder.href', '');
    let verb = _get(this.state, 'readyForCancel._links.cancelOrder.verb', 'PATCH');
    this.props.dispatch(postData(cancelUrl, null, null, options, verb)).then((cancelSuccess) => {
      console.log("cancelSuccess", cancelSuccess);
      this.setState({ openCancelOrder: false });
      let options = {
        init: OPTIONS.REQUEST_ORDER_LIST,
        success: OPTIONS.RECEIVED_ORDER_LIST,
        error: OPTIONS.RECEIVED_ORDER_LIST_ERROR
      }
      this.props.dispatch(postData(OPTIONS.ORDER_URL, { data: { customerId: localStorage.getItem('id') } }, 'Order_List', options));
      this.props.dispatch(showMessage({ text: 'Order successfully cancelled', isSuccess: true }));
      setTimeout(() => {
        this.props.dispatch(showMessage({ text: '', isSuccess: true }));
      }, 6000);
    }, (cancelError) => {
      console.log("cancelError", cancelError);
      this.props.dispatch(showMessage({ text: 'Something wrong in cancelling order', isSuccess: false }));
      setTimeout(() => {
        this.props.dispatch(showMessage({ text: '', isSuccess: false }));
      }, 6000);
      this.setState({ openCancelOrder: false });
    })
  }

  render() {
    return (
      <div >
        <OrderDetails
          orderListData={this.props.orderListData || []}
          onCancelOrder={this.onCancelOrder}
          handleTrack={this.handleTrack} />
        <Dialog
          open={this.state.openCancelOrder}
          TransitionComponent={Transition}
          keepMounted
          onClose={this.handleClose}
          aria-labelledby="alert-dialog-slide-title"
          aria-describedby="alert-dialog-slide-description"
          className="dialogbox-ui small"
        >
          <DialogTitle id="alert-dialog-slide-title">
            <h2 className="modal-title">{"Confirmation"}</h2>
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-slide-description">
              <p className="text-dialog">Are you sure want to cancel order?</p>
            </DialogContentText>
          </DialogContent>
          <DialogActions className="col-sm-12 dialog-btn">
            <Button onClick={this.cancelOrder} variant="contained" color="primary">
              Agree
            </Button>
            <Button onClick={this.handleClose} variant="contained" color="secondary">
              Disagree
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    )
  }
}

function mapStateToProps(state) {
  let orderListData = _get(state, 'OrderListData.orderListData.data', [])
  return { orderListData: orderListData };
}

export default connect(mapStateToProps)(profileSideBar(FilterHoc(OrderContainer)))

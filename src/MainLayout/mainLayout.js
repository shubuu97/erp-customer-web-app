import React, { Component } from 'react';
import { connect } from 'react-redux';
import NavBar from '../containers/NavBar';
import Snackbar from '@material-ui/core/Snackbar';
import logo from './../assets/images/logo-main.png';
import userAvatar from './../assets/images/usericon2.png';
import search from './../assets/images/search.png';
import bell from './../assets/images/bell-icon.png';
import cart from './../assets/images/cart-icon.png';
import { Redirect } from 'react-router-dom';
import { logout } from '../action/loginAction';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

class MainLayout extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showMenu: false,
      anchorEl:null
    };
  }
  handleOpen = () => {
    return true;
  };
  handleLogOut = () => {
    this.props.dispatch(logout());
    localStorage.clear();
    this.props.history.push('/');
    this.handleMenuClose();
  }
  handleMenu = event => {
    this.setState({ anchorEl: event.currentTarget });
  };
  handleMenuClose = () => {
    this.setState({ anchorEl: null });
  };
  handleProfile = () => {
   this.props.role == 'customer' ? this.props.history.push('/customerProfile') : this.props.history.push('/companyProfile');
    this.handleMenuClose();
  }
  goToProductList = () => {
    this.props.history.push('/productList');
  }
  render() {
    console.log('this is props', this.props);
    const { anchorEl } = this.state;
    return (
      <div className="main-container">
        {/* {/ <HeaderLayout /> /} */}
        <div className="content">
          <div className="col-sm-12 app-header">
            <div className="header-top">

              {/* <span className="pull-right" style={{ cursor: 'pointer' }} onClick={this.handleLogOut}>Logout</span>
              <div onClick={() => this.props.history.push('/cart')} className="pull-right" style={{ marginRight: '20px', cursor: 'pointer' }}>
                <i className="fa fa-cart-plus" style={{ fontSize: '2em', color: 'green' }}></i>
              </div> */}
              <div className="user-avatar" onClick={this.handleMenu}>
                <img src={userAvatar} />
                <span className="user-name">Hey, Jack</span>
                <i class="fa fa-caret-down"></i>
              </div>
              <Menu
                id="simple-menu"
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={this.handleMenuClose}
                className={'user-menu'}
              >
                <MenuItem onClick={this.handleProfile} style={{fontSize:"1.4rem"}}>Profile</MenuItem>
                <MenuItem onClick={this.handleLogOut} style={{fontSize:"1.4rem"}}>Logout</MenuItem>
              </Menu>
            </div>
            <div className="header-nav">
              <div className="main-logo">
                <img src={logo} />
              </div>
              <NavBar handleClick={this.goToProductList}/>
              <ul className="navRight">
                <li><span className="rel"><img src={search} /></span></li>
                <li><span className="rel"><img src={bell} /><span className="bell-round">2</span></span></li>
                <li><span className="rel"><img src={cart} /><span className="cart-round">2</span></span></li>
              </ul>
            </div>
            {this.props.message && <Snackbar
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              open={this.handleOpen()}
              autoHideDuration={6000}
              onClose={() => { }}
              ContentProps={{
                'aria-describedby': 'message-id',
              }}
              message={<span id="message-id">{this.props.message}</span>}
            />}
          </div>
          <div className="right-content">

            {this.props.children}
          </div>
          {/* <Alert stack={{ limit: 3 }} /> */}
        </div>
        {/* <div className="footer">
              { `Copyright \u00A9 2018 All On Block Inc.` }
        </div> */}
      </div>
    );
  }
}

const mapStateToProps = state => {
  console.log(state, "state is hre")
  let message = state.commonData.message;
  let isLoading = state.registerReducer.isFetching;
  let customerStatus = state.basicInfodata && state.basicInfodata.customerStatus
  let role = state.basicInfodata && state.basicInfodata.role
  return { message, isLoading, customerStatus, role }
}

export default connect(mapStateToProps)(MainLayout)

import React, { Component } from 'react';
import { connect } from 'react-redux';
import NavBar from '../containers/NavBar';
import Snackbar from '@material-ui/core/Snackbar';
import logo from './../assets/images/logo-main.png';
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
<<<<<<< HEAD
=======
    console.log('this is props', this.props);
    const { anchorEl } = this.state;
>>>>>>> 4bb626d64fedf76234d55217aab130dd9cad8807
    return (
      <div className="main-container">
        {/* {/ <HeaderLayout /> /} */}
        <div className="content">
          <div className="col-sm-12 app-header">
            <div className="header-top">
              <img className="main-logo" src={logo} />

              {/* <span className="pull-right" style={{ cursor: 'pointer' }} onClick={this.handleLogOut}>Logout</span>
              <div onClick={() => this.props.history.push('/cart')} className="pull-right" style={{ marginRight: '20px', cursor: 'pointer' }}>
                <i className="fa fa-cart-plus" style={{ fontSize: '2em', color: 'green' }}></i>
              </div> */}
              <div className="pull-right user-avatar" style={{ cursor: 'pointer' }} onClick={this.handleMenu}>
                <i className="fa fa-user-circle" style={{ fontSize: '2em' }}></i>
                <span className="user-name">Hey, Jack</span>
                <i class="fa fa-caret-down" style={{ fontSize: '1.2em' }}></i>
              </div>
              <Menu
                id="simple-menu"
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={this.handleMenuClose}
                className={'user-menu'}
              >
                <MenuItem onClick={this.handleProfile}>Profile</MenuItem>
                <MenuItem onClick={this.handleLogOut}>Logout</MenuItem>
              </Menu>
            </div>

            <NavBar handleClick={this.goToProductList}/>
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
  let message = state.commonData.message;
  let isLoading = state.registerReducer.isFetching;
  let customerStatus = state.basicInfodata && state.basicInfodata.customerStatus
  let role = state.basicInfodata && state.basicInfodata.role
  return { message, isLoading, customerStatus, role }
}

export default connect(mapStateToProps)(MainLayout)

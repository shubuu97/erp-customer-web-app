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
import { withStyles, withTheme } from '@material-ui/core/styles';
import MiniCart from '../containers/Products/Cart/MiniCart/'

const styles = theme => ({
  failure: {
    background: 'red',
    fontSize: '1.4rem'
  },
  success: {
    background: 'green',
    fontSize: '1.4rem'
  }
});
class MainLayout extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showMenu: false,
      anchorEl: null,
      showMiniCart:false
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
  toggleMiniCartState = () =>
  {
    this.setState({showMiniCart:!this.state.showMiniCart})
  }
  render() {
    console.log('this is props', this.props);
    const { classes, theme, userInfo, cartData } = this.props;
    const { anchorEl } = this.state;
    return (
      <div className="main-container">
        {/* {/ <HeaderLayout /> /} */}
        <div className="content">
          <div className="col-sm-12 app-header">
            <div className="header-top" style={{position:'relative'}}>
              <div className="user-avatar" onClick={this.handleMenu}>
                <img src={userAvatar} />
                <span className="user-name">Hey, {userInfo.firstName || 'Guest'}</span>
                <i className="fa fa-caret-down"></i>
              </div>
              <Menu
                id="simple-menu"
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={this.handleMenuClose}
                className={'user-menu'}
              >
                 
                <MenuItem onClick={this.handleProfile} style={{ fontSize: "1.4rem" }}>Profile</MenuItem>
                <MenuItem onClick={this.handleLogOut} style={{ fontSize: "1.4rem" }}>Logout</MenuItem>
              </Menu>
            </div>
            <div className="header-nav">
              <div className="main-logo">
                <img src={logo} />
              </div>
              <NavBar handleClick={this.goToProductList} />

              <ul className="navRight">
                <li><span className="rel"><img src={search} /></span></li>
                <li><span className="rel"><img src={bell} /><span className="bell-round">2</span></span></li>
                <li onClick={this.toggleMiniCartState}><span className="rel"><img src={cart} /><span className="cart-round">{cartData.length || 0}</span></span></li>
                <div>
                  {this.state.showMiniCart?<MiniCart toggleMiniCartState={this.toggleMiniCartState} {...this.props}/>:null}
                </div>
              </ul>

            
            </div>
            {this.props.message.text && <Snackbar
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              open={this.handleOpen()}
              autoHideDuration={6000}
              onClose={() => { }}
              ContentProps={{
                'aria-describedby': 'message-id',
                classes: {
                  root: this.props.message.isSuccess ? classes.success : classes.failure
                }
              }}
              message={<span id="message-id">{this.props.message.text}</span>}
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
  let message = state.commonData && state.commonData.message ? state.commonData.message : {};
  let isLoading = state.registerReducer.isFetching;
  let userInfo = state.basicInfodata && state.basicInfodata.basicInfoData;
  let cartData = (state.productData && state.productData.cartProductList) || [] ;
  let customerStatus = state.basicInfodata && state.basicInfodata.customerStatus;
  let role = state.basicInfodata && state.basicInfodata.role;
  return { message, isLoading, customerStatus, role, userInfo, cartData }
}

export default connect(mapStateToProps)((withStyles(styles)(MainLayout)))

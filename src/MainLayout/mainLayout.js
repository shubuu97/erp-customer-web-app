import React, { Component } from 'react';
import { connect } from 'react-redux';
import NavBar from '../containers/NavBar';
import Snackbar from '@material-ui/core/Snackbar';
import logo from './../assets/images/logo-main.png';
import userAvatar from './../assets/images/usericon2.png';
import search from './../assets/images/search.png';
import bell from './../assets/images/bell-icon.png';
import cart from './../assets/images/cart-icon.png';
import offers from './../assets/images/offers.png';
import { Redirect } from 'react-router-dom';
import { logout } from '../action/loginAction';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import menuicon from './../assets/images/menu.png';
import { withStyles, withTheme } from '@material-ui/core/styles';
import MiniCart from '../containers/Products/Cart/MiniCart/';
import { fetchCategory } from '../action/category';
import { fetchCategoryTypeAndItems } from '../action/categoryTypeAndItems';
import { selectedCategory } from '../action/category';
import { APPLICATION_BFF_URL } from '../constants/urlConstants';
import { setSelectedCategoryType, applyFilter } from '../containers/Products/action/product';
import { get,findIndex } from 'lodash';
import { showMessage } from '../action/common';

 
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
const priceFilterObject = {
  lessThan50: false,
  from50To100: false,
  from100To200: false,
  above200: false
}
class MainLayout extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showMenu: false,
      anchorEl: null,
      showMiniCart: false,
      isMenuOpen: false
    };
  }
  componentDidMount() {
    this.props.dispatch(fetchCategory(`${APPLICATION_BFF_URL}/inventory/itemcategories`, { isActive: 1 })).then((data) => {
      console.log("Category list in Main Layout", data);
      this.props.dispatch(selectedCategory(get(data, 'data.itemCategories[0]', null)));
      if (get(data, 'data.itemCategories[0]', null)) {
        this.props.dispatch(fetchCategoryTypeAndItems(`${APPLICATION_BFF_URL}/inventory/items/bycategory`, { categoryId: get(data, 'data.itemCategories[0].categoryId', null).toString() })).then((typeData) => {
          console.log("In Main Layout Component did mount", typeData);

         // this.props.dispatch(setSelectedCategoryType(get(typeData, 'data.itemTypes[0]', null)));
          //this.props.dispatch(applyFilter(get(typeData, 'data.itemTypes[0].products', []), priceFilterObject));
        }, (err) => {
          console.log(err);
        });
      }
    }, (err) => {
      console.log(err);
    });
  }
  handleOpen = () => {
    return true;
  };
  handleLogOut = () => {
    this.props.dispatch(logout());
    localStorage.clear();
    this.props.history.push('/');
    this.handleMenuClose();
    this.setState({ isMenuOpen: false });
  }
  handleMenu = event => {
    this.setState({ anchorEl: event.currentTarget });
  };
  handleMenuClose = () => {
    this.setState({ anchorEl: null });
  };
  handleProfile = () => {
    this.props.role == 'customer' ? this.props.history.push('/StaticProfileView') : this.props.history.push('/ComapnyStaticProfileView');
    this.handleMenuClose();
    this.setState({ isMenuOpen: false });
  }
  
  goToProductList = (category) => {
    this.props.dispatch(selectedCategory(category));
    this.props.dispatch(fetchCategoryTypeAndItems(`${APPLICATION_BFF_URL}/inventory/items/bycategory`, { categoryId: category.categoryId.toString() })).then((data) => {
      console.log("Product Data", data);
     let indexOfItem = findIndex( get(data,'data.itemTypes',[]),{'id':get(this.props,'selectedCategoryType.id','')})||0
      this.props.dispatch(setSelectedCategoryType(get(data, `data.itemTypes[${indexOfItem}]`, null)));
      this.props.dispatch(applyFilter(get(data, `data.itemTypes[${indexOfItem}].products`, []), {}));
    }, (err) => {
      console.log(err);
    });
    switch (this.props.customerStatus) {
      case 'In Approval':
        this.showMessageOnNavClick("Your profile is under approval, After approval you can see products");
        break;
      case 'New':
        this.showMessageOnNavClick("Please submit your details to proceed further");
        break;
      case 'Approved':
        this.props.history.push('/productList')
        break;
      case 'Cancelled':
        this.showMessageOnNavClick("Sorry, Your profile has been rejected, Please resubmit your profile to see products");
        break;
    }
    this.setState({ isMenuOpen: false });
  }
  showMessageOnNavClick = (message) => {
    this.props.dispatch(showMessage({text: message, isSuccess: false}));
    setTimeout(()=>{
      this.props.dispatch(showMessage({text: '', isSuccess: false}));
    }, 6000);
  }
  toggleMiniCartState = () => {
    this.setState({ showMiniCart: !this.state.showMiniCart })
  }
  handleOrders = () => {
    this.props.history.push('/orders');
    this.handleMenuClose();
  }
  toggleMenu = () => {
    console.log('toggleMenu', this.state.isMenuOpen);
    this.setState({ isMenuOpen: !this.state.isMenuOpen });
  }
  render() {
    console.log('this is props', this.props);
    const { classes, theme, userInfo, cartData, categories, selectedCategory } = this.props;
    const { anchorEl, isMenuOpen } = this.state;
    return (
      <div className="main-container">
        {/* {/ <HeaderLayout /> /} */}
        <div className="content">
          <div className="col-sm-12 app-header">
            <div className="header-top">
              <div className="user-avatar hidden-xs" onClick={this.handleMenu}>
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

                <MenuItem onClick={this.handleProfile} style={{ fontSize: "1.4rem" }}>My Account</MenuItem>
                {/* <MenuItem onClick={this.handleOrders} style={{ fontSize: '1.4rem' }}>Orders</MenuItem> */}


                <MenuItem onClick={this.handleLogOut} style={{ fontSize: "1.4rem" }}>Logout</MenuItem>
              </Menu>
            </div>
            {this.state.showMiniCart && <div className="cart-backdrop" onClick={this.toggleMiniCartState}></div>}
            <div className="header-nav">
              <span  className="visible-xs menu" onClick={this.toggleMenu}><img src={menuicon} /></span>
              <div className="main-logo">
                <img src={logo} />
              </div>
              {isMenuOpen && <div className="backdrop visible-xs" onClick={this.toggleMenu}></div>}
              <NavBar selectedCategory={selectedCategory}
                dispatch={this.props.dispatch}
                userInfo={userInfo} isMenuOpen={isMenuOpen}
                handleClick={this.goToProductList}
                categories={categories.itemCategories}
                handleProfile={this.handleProfile}
                handleLogOut={this.handleLogOut} />
              <ul className="navRight">
                <li className="hidden-xs"><span title="Search" className="rel"><img src={search} /></span></li>
                <li><span title="Offers" className="rel offers-icon"><img src={offers} /></span></li>
                <li><span title="Notification" className="rel"><img src={bell} /><span className="bell-round">2</span></span></li>
                <li style={this.props.customerStatus != 'Approved' ? { pointerEvents: 'none', opacity: 0.6 } : null} onClick={this.toggleMiniCartState}><span title='Cart' className="rel"><img src={cart} /><span className="cart-round">{cartData.length || 0}</span></span></li>
                <div>
                  {this.state.showMiniCart ? <MiniCart toggleMiniCartState={this.toggleMiniCartState} {...this.props} /> : null}
                </div>
              </ul>
              <div className="mobile-search visible-xs">
                <input className="form-control" placeholder="Search" />
              </div>
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
          <div className="main-content">

            {this.props.children}
          </div>
          {/* <Alert stack={{ limit: 3 }} /> */}
        </div>
        <div className="footer">
          <div className="footer-left">
            <ul>
              <li>Terms & Condition</li>
              <li>Privacy Policy</li>
              <li>Disclaimer</li>
              <li>Legal Policy</li>
            </ul>
          </div>
          <div className="footer-right">
            {`\u00A9 2018 CANNAONBLOCK All Rights Reserved.`}
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  let message = state.commonData && state.commonData.message ? state.commonData.message : {};
  let isLoading = get(state,"registerReducer.isFetching", false);
  let userInfo = state.basicInfodata && state.basicInfodata.basicInfoData;
  let cartData = (state.productData && state.productData.cartProductList) || [];
  let customerStatus = state.basicInfodata && state.basicInfodata.customerStatus;
  let role = state.basicInfodata && state.basicInfodata.role;
  let categories = state.categoryData && state.categoryData.categories;
  let selectedCategory = state.categoryData && state.categoryData.selectedCategory;
  let selectedCategoryType = (state.productData && state.productData.selectedCategoryType) || {};

  return { message, isLoading, customerStatus, role, userInfo, cartData, categories, selectedCategory ,selectedCategoryType}
}

export default connect(mapStateToProps)((withStyles(styles)(MainLayout)))

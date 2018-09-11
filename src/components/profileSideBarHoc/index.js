import React, { Component } from 'react';
import { debug } from 'util';
import { logout } from '../../action/loginAction';

const profileSideBar = (WrappedComponent) => {

    return class Enhancer extends Component {
   constructor(props)
   {
     super(props)
     this.state = {
      activeLi:1
     }
   }
      handleMenuClick = () => {
        localStorage.getItem('role') == 'customer' ? this.props.history.push('/StaticProfileView') : this.props.history.push('/companyProfile');
      }
      handleClick=(activeLi,route)=>
      {
        this.setState({activeLi});
        this.props.history.push(route)
      }
      handleLogOut = () => {
        // this.props.dispatch(logout());
        // localStorage.clear();
        // this.props.history.push('/');
        // this.handleMenuClose();
      }
        render() {
      
            return (
            <div className="container">
            <h2 class="cart-heading">My Account</h2>
            <div className="row">
            <div className="col-sm-3">
              <div className="profile-sidebar">
                <ul>
                  <li onClick={()=>this.handleMenuClick()}>My Profile</li>
                  <li   onClick={()=>this.handleClick(2,'/orders')}>My Orders</li>
                  <li  onClick={()=>this.handleClick(3,'/AddressBook')}>Address Book</li>
                  <li  onClick={()=>this.handleClick(4,'/myOffers')}>My Offers</li>
                  <li  onClick={()=>this.handleClick(5,'/Notifications')}>Notifications</li>
                  <li  onClick={()=>this.handleLogOut()}>Logout</li>
                </ul>
              </div>
              </div>
              <WrappedComponent {...this.props}/>
              
              </div>
            </div>
            
            )
        }
    }
}

export default profileSideBar;

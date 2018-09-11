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
        localStorage.getItem('role') == 'customer' ? this.props.history.push('/StaticProfileView') : this.props.history.push('/StaticProfileView');
      }
      handleClick=(activeLi,route)=>
      {
        this.setState({activeLi});
        this.props.history.push(route)
        console.log("location", this.props.location);
      }
      handleLogOut = () => {
         this.props.dispatch(logout());
         this.props.history.push('/');
      }
        render() {
      
            return (
            <div className="container">
            <h2 class="cart-heading">My Account</h2>
            <div className="row">
            <div className="col-sm-3">
              <div className="profile-sidebar">
                <ul>
                  <li className={`${this.props.location.pathname == '/StaticProfileView' ? 'active': ''}`} onClick={()=>this.handleMenuClick()}>My Profile</li>
                  <li className={`${this.props.location.pathname == '/orders' ? 'active': ''}`}  onClick={()=>this.handleClick(2,'/orders')}>My Orders</li>
                  <li className={`${this.props.location.pathname == '/AddressBook' ? 'active': ''}`} onClick={()=>this.handleClick(3,'/AddressBook')}>Address Book</li>
                  <li className={`${this.props.location.pathname == '/myOffers' ? 'active': ''}`} onClick={()=>this.handleClick(4,'/myOffers')}>My Offers</li>
                  <li className={`${this.props.location.pathname == '/Notifications' ? 'active': ''}`} onClick={()=>this.handleClick(5,'/Notifications')}>Notifications</li>
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

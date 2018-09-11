import React, { Component } from 'react';
import { debug } from 'util';

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
        render() {
            return (
            <div className="container">
            <h2 class="cart-heading">My Dashboard</h2>
            <div className="row">
            <div className="col-sm-3">
              <div className="profile-sidebar">
                <ul>
                  <li onClick={()=>this.handleMenuClick()} className={this.state.activeLi==1?`active`:null}>My Profile</li>
                  <li className={this.state.activeLi==2?`active`:null}  onClick={()=>this.handleClick(2,'/orders')}>My Orders</li>
                  <li className={this.state.activeLi==3?`active`:null} onClick={()=>this.handleClick(3,'/AddressBook')}>Address Book</li>
                  <li className={this.state.activeLi==4?`active`:null} onClick={()=>this.handleClick(3,'/myOffers')}>My Offers</li>
                  <li className={this.state.activeLi==5?`active`:null} onClick={()=>this.handleClick(3,'/Notifications')}>Notifications</li>
                  <li className={this.state.activeLi==6?`active`:null} onClick={()=>this.handleClick(3,'/Logout')}>Logout</li>
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

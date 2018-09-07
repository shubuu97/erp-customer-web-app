import React from 'react';

const profileSideBar = (WrappedComponent) => {
    return class Enhancer extends WrappedComponent {
        render() {
            return (
            <div className="container">
            <h2 class="cart-heading">My Dashboard</h2>
            <div className="row">
            <div className="col-sm-3">
              <div className="profile-sidebar">
                <ul>
                  <li className="active">My Profile</li>
                  <li>My Orders</li>
                  <li>Address Book</li>
                  <li>My Offers</li>
                  <li>Notifications</li>
                  <li>Logout</li>
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

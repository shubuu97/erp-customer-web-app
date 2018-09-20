import React, { Component } from 'react';
import usergreen from '../../assets/images/user-green.png';
import account from '../../assets/images/account.png';
import logout from '../../assets/images/logout.png';

export default class extends Component {
    render() {
        return (
            <div className={`app-navbar ${this.props.isMenuOpen ? 'menuOpen': ''}`}>
            <div className="user-avatar visible-xs">
                <span className="user-avatar-circle"><img src={usergreen} /></span>
                <span className="user-name"><span className="hey">Hey,</span> {this.props.userInfo.firstName || 'Guest'}</span>
              </div>
            <ul>
                <li className="drop-menu">Browse Categories &nbsp; <i className="fa fa-angle-down"></i>
                <div className="drop-categories">
                    <div className="row d-flex">
                        <div className="col category-flex-column">
                            <ul className="drop-category-box">
                                <li className="category">Cannabis <i className="fa fa-caret-right"></i></li>
                                <li>Cones</li>
                                <li>Pre Roll</li>
                                <li>Seed</li>
                                <li>Shake</li>
                            </ul>
                        </div>
                    </div>
                </div>
                </li>
                {this.props.categories && this.props.categories.map((category)=>(
                    <li className={category.id == this.props.selectedCategory.id ? 'active' : '' } onClick={()=>this.props.handleClick(category)}>{category.displayName}</li>
                ))}
            </ul>
            <ul className="visible-xs mobile-user">
                <li onClick={this.props.handleProfile}><span><img src={account} /></span>My Account</li>
                <li onClick={this.props.handleLogOut}><span><img src={logout} /></span>Logout</li>
            </ul>
            </div>
        )
    }
}
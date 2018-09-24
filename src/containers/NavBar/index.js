import React, { Component } from 'react';
import usergreen from '../../assets/images/user-green.png';
import account from '../../assets/images/account.png';
import logout from '../../assets/images/logout.png';

export default class extends Component {
  render() {
    return (
      <div className={`app-navbar ${this.props.isMenuOpen ? 'menuOpen' : ''}`}>
        <div className="user-avatar visible-xs">
          <span className="user-avatar-circle"><img src={usergreen} /></span>
          <span className="user-name"><span className="hey">Hey,</span> {this.props.userInfo.firstName || 'Guest'}</span>
        </div>
        <ul>
          <li className="drop-menu">Browse Categories &nbsp; <i className="fa fa-angle-down"></i>
            <div className="drop-categories">
              {this.props.categories && this.props.categories.map((category) => (
                <div className="col category-flex-column">
                  <ul className="drop-category-box" onClick={() => this.props.handleClick(category)}>
                    <li className="category">{category.displayName} &nbsp; <i className="fa fa-caret-right"></i></li>
                    {category.itemTypes && category.itemTypes.map((itemType) => (
                      <li>{itemType.type}</li>
                    ))}
                  </ul>
                </div>
              ))}

              {/* <ul className="drop-category-box">
                  <li className="category">Cannabis &nbsp; <i className="fa fa-caret-right"></i></li>
                  <li>Cones</li>
                  <li>Pre Roll</li>
                  <li>Seed</li>
                  <li>Shake</li>
                </ul> */}
              {/* <ul className="drop-category-box">
                  <li className="category">Topicals &nbsp; <i className="fa fa-caret-right"></i></li>
                  <li>Balms</li>
                  <li>Lotionn</li>
                  <li>Lubricants & Oils</li>
                  <li>Sprays</li>
                  <li>Transdermal Patches</li>
                </ul> */}

              {/* <div className="col category-flex-column">
                <ul className="drop-category-box">
                  <li className="category">Concentrates &nbsp; <i className="fa fa-caret-right"></i></li>
                  <li>Cartridges</li>
                  <li>Ingestible</li>
                  <li>Solvent</li>
                  <li>Solventless</li>
                  <li>Tarpenes</li>
                </ul>
                <ul className="drop-category-box">
                  <li className="category">Flowers &nbsp; <i className="fa fa-caret-right"></i></li>
                  <li>Indica</li>
                  <li>Sativa</li>
                </ul>
              </div>
              <div className="col category-flex-column">
                <ul className="drop-category-box">
                  <li className="category">Herm CBD Products &nbsp; <i className="fa fa-caret-right"></i></li>
                  <li>Cartridges</li>
                  <li>Ingestible</li>
                  <li>Solvent</li>
                  <li>Solventless</li>
                  <li>Tarpenes</li>
                </ul>
                <ul className="drop-category-box">
                  <li className="category">Gear &nbsp; <i className="fa fa-caret-right"></i></li>
                  <li className="category">Hash &nbsp; <i className="fa fa-caret-right"></i></li>
                  <li className="category">Extract &nbsp; <i className="fa fa-caret-right"></i></li>
                  <li className="category">Others &nbsp; <i className="fa fa-caret-right"></i></li>
                </ul>
              </div>
              <div className="col category-flex-column">
                <ul className="drop-category-box">
                  <li className="category">Edibles &nbsp; <i className="fa fa-caret-right"></i></li>
                  <li>Beverages</li>
                  <li>Breakfast</li>
                  <li>Brownies</li>
                  <li>Solventless</li>
                  <li>Tarpenes</li>
                  <li>Cartridges</li>
                  <li>Ingestible</li>
                  <li>Solvent</li>
                  <li>Beverages</li>
                  <li>Breakfast</li>
                  <li>Brownies</li>
                  <li>Solventless</li>
                  <li>Tarpenes</li>
                </ul>
              </div> */}
            </div>
          </li>
          {this.props.categories && this.props.categories.map((category) => (
            <li className={category.id == this.props.selectedCategory.id ? 'active' : ''} onClick={() => this.props.handleClick(category)}>{category.displayName}</li>
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
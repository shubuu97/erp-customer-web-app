import React, { Component } from 'react';
import Navbar from 'react-bootstrap/lib/Navbar';
import Nav from 'react-bootstrap/lib/Nav';
import NavItem from 'react-bootstrap/lib/NavItem';
import { Link } from 'react-router-dom';
import logo from '../../assets/images/aobLogo.png';
import connect from 'react-redux/lib/connect/connect';

class HeaderLayout extends Component {
  render() {
    return (

            <Navbar collapseOnSelect>
                <Navbar.Header>
                    <Navbar.Brand>
                    <Link className="nav-link" to="/">
                        <img className="logoimg" src={logo} alt="AllOnBlock Logo" />
                    </Link>
                    </Navbar.Brand>

                    <Navbar.Toggle />
                </Navbar.Header>
                <div className="nav-right" >
                {this.props.userName &&
                <Nav className="user-name" style={{}}>
                        <i class="fa fa-user-o"></i> {this.props.userName}
                </Nav>}
                {this.props.userName && <NavItem className="logout" eventKey={1} href="/" >
                <i class="fa fa-sign-out" aria-hidden="true"></i> Logout
                </NavItem>}
                {/* {!this.props.userName &&  <NavItem eventKey={1} href="/#/" id="hide-tab">
                        Login
                </NavItem>} */}

                </div>

            </Navbar>


    );
  }
}
const mapStateToProps = (state) => {
  const {
    userRolesReducer,
  } = state;

  const { menu } = userRolesReducer.userRolesData ? userRolesReducer.userRolesData : {};
  const { userName } = userRolesReducer.userRolesData ? userRolesReducer.userRolesData : {};


  return {
    menu,
    userName,

  };
};

export default connect(mapStateToProps)(HeaderLayout);

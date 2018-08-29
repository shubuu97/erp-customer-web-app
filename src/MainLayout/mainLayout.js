import React, { Component } from 'react';
import {connect} from 'react-redux';
// import "./assets/stylesheets/reset.css";
//import HeaderLayout from './components/common/HeaderNav.jsx';
import NavBar from '../containers/NavBar';
import Snackbar from '@material-ui/core/Snackbar';
// import "./assets/stylesheets/main.css";
// import Alert from 'react-s-alert';
// import SaveButton from './components/common/SaveButton.jsx';
// import 'react-s-alert/dist/s-alert-default.css';
// import 'react-s-alert/dist/s-alert-css-effects/slide.css';
// import Link from 'react-router-dom/Link';
 import logo from './../assets/images/logo-main.png';
 import {Redirect} from 'react-router-dom';
 import {logout} from '../action/loginAction'

 class MainLayout extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showMenu: false,
    };
    // this.handleClose = this.handleClose.bind(this);
  }
//   handleShowMenu = () => {
//     this.setState({ showMenu: !this.state.showMenu });
//     this.forceUpdate();
//   }
//   componentDidMount() {
//     this.setState({
//       width: window.innerWidth,
//     });
//     if (window.innerWidth > 768) {
//       this.setState({ showMenu: true });
//     }
//     this.forceUpdate();
//   }
//   mobileClose = () => {
//     if (this.state.window < 767) {
//       this.handleClose();
//     }
//   }
//   handleClose() {
//     this.setState({ showMenu: false });
//     this.forceUpdate();
//   }
handleOpen=()=>
        {
            return true;
        };
        handleLogOut=()=>
        {
          this.props.dispatch(logout());
          localStorage.clear();
          this.props.history.push('/')
        }
  render() {
    console.log('this is props', this.props);
    return (
      <div className="main-container">
        {/* {/ <HeaderLayout /> /} */}
        <div className="content">
          <div className="col-sm-12 app-header">
            <div className="header-top">
              
              
              <span className="pull-right" style={{cursor:'pointer'}} onClick={this.handleLogOut}>Logout</span>
           <div onClick={()=>this.props.history.push('/cart')} className="pull-right" style={{marginRight:'20px',cursor:'pointer'}}>
           <i className="fa fa-cart-plus" style={{fontSize:'2em',color:'green'}}></i>
           </div>
            </div>

              <div className="header-nav"><div className="main-logo"><img src={logo} /></div><NavBar/></div>
              {this.props.message && <Snackbar
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
          open={this.handleOpen()}
          autoHideDuration={6000}
          onClose={()=>{}}
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
  console.log(state,"state is hre")
  let message = state.commonData.message;
  let isLoading = state.registerReducer.isFetching;
  let customerStatus  = state.basicInfodata&& state.basicInfodata.customerStatus
  return {message, isLoading,customerStatus}
}

export default connect(mapStateToProps)(MainLayout)

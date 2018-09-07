import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import AccountInfo from '../AccountInfo';
import BankingInfo from '../BankingInfo';
import profileSideBar from '../../../components/profileSideBarHoc';

function TabContainer(props) {
  return (
    <Typography component="div" style={{ padding: 8 * 3 }}>
      {props.children}
    </Typography>
  );
}

TabContainer.propTypes = {
  children: PropTypes.node.isRequired,
};

const styles = theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
  tabStyle: {
    backgroundColor: 'white',
    color: '#000'
  },
  tabActive: {
    backgroundColor: '#0e8c4f',
    color: '#FFF'
  }
});

class CustomerProfileTab extends React.Component {
  state = {
    value: 0,
  };
  componentDidMount()
  {
    // this.props.dispatch(postBasicInfoData({ email: localStorage.getItem('email') }, '', `${APPLICATION_BFF_URL}/user/logindata`))
     


      // this.props.dispatch(fetchBankingDetailsData(`${APPLICATION_BFF_URL}/customer/bankingdetails?_id=${localStorage.getItem("id")}`));
  }
  handleChange = (event, value) => {
    this.setState({ value });
  };
 
  render() {
    const { classes } = this.props;
    const { value } = this.state;

    return (
      <div className="col-sm-9">
      <div className={classes.root + ' c-tabs'}>
        <AppBar position="static">
          <Tabs className={classes.tabStyle} value={value} onChange={this.handleChange} style={{borderBottom:'solid 1px #DDD', boxShadow:'none'}} TabIndicatorProps={{color:'transparent'}}>
            <Tab className={value==0?classes.tabActive:null} label="Account" />
            <Tab className={value==1?classes.tabActive:null} label="Banking"/>
          </Tabs>
        </AppBar>
        {value === 0 && <TabContainer><AccountInfo/></TabContainer>}
        
        {value === 1 && <TabContainer><BankingInfo{...this.props}/></TabContainer>}
      </div>
      </div>
    );
  }
}

CustomerProfileTab.propTypes = {
  classes: PropTypes.object.isRequired,
};

CustomerProfileTab=withStyles(styles)(CustomerProfileTab);

export default profileSideBar(CustomerProfileTab);


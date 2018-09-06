import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import AccountInfo from '../AccountInfo';
import LicenceInfo from '../LicenceInfo';
import SiteInfo from '../SiteInfo';
import BankingInfo from '../BankingInfo';


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

class CompanyProfileTab extends React.Component {
  state = {
    value: 0,
  };

  handleChange = (event, value) => {
    this.setState({ value });
  };

  handleTabSwitch=(tabNumber)=>
  {
    this.setState({ value:tabNumber });
  }
  render() {
    const { classes } = this.props;
    const { value } = this.state;

    return (
      <div className="container">
        <div className={classes.root + ' c-tabs'}>
            <Tabs className={classes.tabStyle} value={value} onChange={this.handleChange} style={{borderBottom:'solid 1px #DDD'}} TabIndicatorProps={{color:'transparent'}}>
              <Tab className={value==0?classes.tabActive:null} label="Account" />
              <Tab className={value==1?classes.tabActive:null} label="Licence" />
              <Tab className={value==2?classes.tabActive:null} label="Site"  />
              <Tab className={value==3?classes.tabActive:null} label="Banking"/>
            </Tabs>
        
          {value === 0 && <TabContainer><AccountInfo handleTabSwitch={this.handleTabSwitch}/></TabContainer>}
          {value === 1 && <TabContainer><LicenceInfo handleTabSwitch={this.handleTabSwitch}/></TabContainer>}
          {value === 2 && <TabContainer><SiteInfo handleTabSwitch={this.handleTabSwitch}/></TabContainer>}
          {value === 3 && <TabContainer><BankingInfo {...this.props}/></TabContainer>}
        </div>
      </div>
    );
  }
}

CompanyProfileTab.propTypes = {
  classes: PropTypes.object.isRequired,
};

CompanyProfileTab = withStyles(styles)(CompanyProfileTab);



export default CompanyProfileTab


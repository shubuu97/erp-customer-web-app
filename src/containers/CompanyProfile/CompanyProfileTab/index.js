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
import profileSideBar from '../../../components/profileSideBarHoc';
import qs from 'query-string'
import wc from './../../../assets/images/wc.png';
import gc from './../../../assets/images/gc.png';
import {connect} from 'react-redux';


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

  handleTabSwitch = (tabNumber) => {
    this.setState({ value: tabNumber });
  }
  componentDidMount() {
    let queryString = qs.parse(this.props.location.search);
    queryString.tab ? this.handleTabSwitch(parseInt(queryString.tab)) : null

  }
  render() {
    const { classes } = this.props;
    const { value } = this.state;

    return (
      <div >
        <div className={classes.root + ' c-tabs'}>
          <Tabs className={classes.tabStyle} value={value} onChange={this.handleChange} style={{ borderBottom: 'solid 1px #DDD' }} TabIndicatorProps={{ color: 'transparent' }}>
            <Tab className={value == 0 ? classes.tabActive : null} label={<span className="c-tabs-label">{this.props.userAccountData.accountStatus && (value == 0 ? <img className="c-tabs-img" src={wc} />:<img className="c-tabs-img" src={gc} />)}Account</span>} />
            <Tab className={value == 1 ? classes.tabActive : null} label={<span className="c-tabs-label">{this.props.userAccountData.licenseStatus && (value == 1 ? <img className="c-tabs-img" src={wc} />:<img className="c-tabs-img" src={gc} />)}License</span>} />
            <Tab className={value == 2 ? classes.tabActive : null} label={<span className="c-tabs-label">{this.props.userAccountData.siteStatus && (value == 2 ? <img className="c-tabs-img" src={wc} />:<img className="c-tabs-img" src={gc} />)}Site</span>} />
            <Tab className={value == 3 ? classes.tabActive : null} label={<span className="c-tabs-label">{this.props.userAccountData.bankingDetailStatus && (value == 3 ? <img className="c-tabs-img" src={wc} />:<img className="c-tabs-img" src={gc} />)}Banking</span>} />
          </Tabs>

          {value === 0 && <TabContainer><AccountInfo handleTabSwitch={this.handleTabSwitch} /></TabContainer>}
          {value === 1 && <TabContainer><LicenceInfo handleTabSwitch={this.handleTabSwitch} /></TabContainer>}
          {value === 2 && <TabContainer><SiteInfo handleTabSwitch={this.handleTabSwitch} /></TabContainer>}
          {value === 3 && <TabContainer><BankingInfo {...this.props} /></TabContainer>}
        </div>
      </div>
    );
  }
}

CompanyProfileTab.propTypes = {
  classes: PropTypes.object.isRequired,
};

CompanyProfileTab = withStyles(styles)(CompanyProfileTab);
function mapStateToProps(state) {
  let userAccountData = {};
  userAccountData = state.basicInfodata && state.basicInfodata.userAccountData
  console.log("In the Tab view", userAccountData);
  return { userAccountData }
}

export default profileSideBar(connect(mapStateToProps)(CompanyProfileTab));



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
import {connect} from 'react-redux';
import {fetchProfileFormData} from '../../../action/profileFormData';
import {postBasicInfoData} from '../../../action/basicInfoActions';
import { fetchBankingDetailsData } from '../../../action/getBankingDetails';
import {fetchLicenseDetailsData} from '../../../action/getLicenseInfo';
import { fetchSiteDetailsData } from '../../../action/getSiteInfo';
import {APPLICATION_BFF_URL} from '../../../constants/urlConstants';


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
  componentDidMount()
  {
      this.props.dispatch(fetchProfileFormData(`${APPLICATION_BFF_URL}/businesscustomer/register`));
      //this.props.dispatch(postBasicInfoData({email: 'test@aob.com'},'',`${APPLICATION_BFF_URL}/user/logindata`))
      this.props.dispatch(fetchBankingDetailsData(`${APPLICATION_BFF_URL}/businesscustomer/bankingdetails?_id=${localStorage.getItem("id")}`));
      this.props.dispatch(fetchLicenseDetailsData(`${APPLICATION_BFF_URL}/businesscustomer/companyinfo?_id=${localStorage.getItem("id")}`));
      this.props.dispatch(fetchSiteDetailsData(`${APPLICATION_BFF_URL}/businesscustomer/siteinfo?_id=${localStorage.getItem("id")}`));
    }

  handleTabSwitch=(tabNumber)=>
  {

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

export default connect()(CompanyProfileTab)


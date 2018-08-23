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
      console.log("came")
      this.props.dispatch(fetchProfileFormData(`${APPLICATION_BFF_URL}/businesscustomer/register`));
      this.props.dispatch(postBasicInfoData({_id: localStorage.getItem('id')},'',`${APPLICATION_BFF_URL}/businesscustomer/basicinfo/search`))
      this.props.dispatch(fetchBankingDetailsData(`${APPLICATION_BFF_URL}/businesscustomer/bankingdetails?_id=${localStorage.getItem("id")}`));
      this.props.dispatch(fetchLicenseDetailsData(`${APPLICATION_BFF_URL}/businesscustomer/companyinfo?_id=${localStorage.getItem("id")}`));
      this.props.dispatch(fetchSiteDetailsData(`${APPLICATION_BFF_URL}/businesscustomer/siteinfo?_id=${localStorage.getItem("id")}`));
    }
  render() {
    const { classes } = this.props;
    const { value } = this.state;

    return (
      <div>
        <div className={classes.root}>
            <Tabs value={value} onChange={this.handleChange}>
              <Tab label="Account" />
              <Tab label="Licence" />
              <Tab label="Site"  />
              <Tab label="Banking"/>
            </Tabs>
        
          {value === 0 && <TabContainer><AccountInfo/></TabContainer>}
          {value === 1 && <TabContainer><LicenceInfo/></TabContainer>}
          {value === 2 && <TabContainer><SiteInfo/></TabContainer>}
          {value === 3 && <TabContainer><BankingInfo/></TabContainer>}
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


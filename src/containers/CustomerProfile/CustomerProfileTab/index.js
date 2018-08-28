import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import AccountInfo from '../AccountInfo';
import BankingInfo from '../BankingInfo';
import { postBasicInfoData } from '../../../action/basicInfoActions';
import {fetchProfileFormData} from '../../../action/profileFormData';
import { fetchBankingDetailsData } from '../../../action/getBankingDetails';
import {connect} from 'react-redux';
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

class CustomerProfileTab extends React.Component {
  state = {
    value: 0,
  };
  componentDidMount()
  {
      this.props.dispatch(fetchProfileFormData(`${APPLICATION_BFF_URL}/customer/register`));
     // this.props.dispatch(postBasicInfoData({email: 'ts@aob.com'},'',`${APPLICATION_BFF_URL}/user/logindata`))


      this.props.dispatch(fetchBankingDetailsData(`${APPLICATION_BFF_URL}/customer/bankingdetails?_id=${localStorage.getItem("id")}`));
  }
  handleChange = (event, value) => {
    this.setState({ value });
  };
 
  render() {
    const { classes } = this.props;
    const { value } = this.state;

    return (
      <div className={classes.root}>
        <AppBar position="static">
          <Tabs value={value} onChange={this.handleChange}>
            <Tab label="Account" />
            <Tab label="Banking"/>
          </Tabs>
        </AppBar>
        {value === 0 && <TabContainer><AccountInfo/></TabContainer>}
        
        {value === 1 && <TabContainer><BankingInfo/></TabContainer>}
      </div>
    );
  }
}

CustomerProfileTab.propTypes = {
  classes: PropTypes.object.isRequired,
};

CustomerProfileTab=withStyles(styles)(CustomerProfileTab);
export default connect()(CustomerProfileTab)


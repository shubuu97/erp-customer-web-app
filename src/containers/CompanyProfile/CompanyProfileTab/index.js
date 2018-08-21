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
});

class CompanyProfileTab extends React.Component {
  state = {
    value: 0,
  };

  handleChange = (event, value) => {
    this.setState({ value });
  };

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

export default withStyles(styles)(CompanyProfileTab);
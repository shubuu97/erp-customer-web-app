import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import AccountInfo from '../AccountInfo';
import BankingInfo from '../BankingInfo';
import {fetchProfileFormData} from '../../../action/profileFormData';
import { postBasicInfoData } from '../../../action/basicInfoActions';
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
});

class CustomerProfileTab extends React.Component {
  state = {
    value: 0,
  };

  handleChange = (event, value) => {
    this.setState({ value });
  };
 
  componentDidMount()
  {
     this.props.dispatch(fetchProfileFormData(`${process.env.APPLICATION_BFF_URL}/customer/register`));

      this.props.dispatch(postBasicInfoData({_id: "5b7530f8a3b7320018ee14b7"},'',`${process.env.APPLICATION_BFF_URL}/customer/basicinfo/search`))
  }
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
CustomerProfileTab = withStyles(styles)(CustomerProfileTab)
function mapStateToProps()
{
return {}
}
export default connect(mapStateToProps)(CustomerProfileTab);


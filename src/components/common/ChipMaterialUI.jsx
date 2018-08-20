import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'material-ui/styles/withStyles';
import Avatar from 'material-ui/Avatar';
import Chip from 'material-ui/Chip';
import FaceIcon from 'material-ui-icons/Face';
import DoneIcon from 'material-ui-icons/Done';

const styles = theme => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap',
  },
  chip: {
    margin: theme.spacing.unit,
  },
});

function Chips(props) {
  const { classes } = props;
  const { supplierName, supplierNumber } = props;


  return (
    <div className={`${classes.root} custom-chips`}>
      { supplierName && (() => (
            <span>
                Supplier Name: <Chip label={supplierName} className={classes.chip}/>
                </span>
      ))()

      }

      { supplierNumber && (() => (
            <span>
                Supplier Number: <Chip label={supplierNumber} className={classes.chip}/>
                </span>
      ))()

      }
    </div>
  );
}

Chips.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Chips);

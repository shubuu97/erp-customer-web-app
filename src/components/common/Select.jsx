import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'material-ui/styles/withStyles';
import InputLabel from 'material-ui/Input/InputLabel';
import MenuItem from 'material-ui/Menu/MenuItem';
import FormControl from 'material-ui/Form/FormControl';
import Select from 'material-ui/Select';
import _map from 'lodash/map';

const styles = theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    padding: 0,
  },
  formControl: {
    // margin: theme.spacing.unit,
    minWidth: 120,
    width: '100%',
  },
  selectEmpty: {
    // marginTop: theme.spacing.unit * 2,
  },
});

class SimpleSelect extends React.Component {
  state = {
    [this.props.name]: this.props.value || '',
  };

  handleChange = (event) => {
    this.setState(
      { [event.target.name]: event.target.value },
      () => {
        this.props.changeHandler(event.target.value);
      },
    );
  };

  render() {
    const {
      classes, data, name, value, displayText, id, emptyText, valueKey = 'value', displayTextKey = 'displayText', changeHandler,
    } = this.props;

    return (
        <FormControl className={classes.formControl}>
          <InputLabel htmlFor={id}>{displayText}</InputLabel>
          <Select
            value={this.state[name]}
            onChange={this.handleChange}
            inputProps={{
              name,
              id,
            }}
            value={value}
          >
            <MenuItem value="">
              <em>{emptyText}</em>
            </MenuItem>
            {
              _map(data, dataPoint => (
                  <MenuItem value={dataPoint[valueKey]}>{dataPoint[displayTextKey]}</MenuItem>
                ))
            }

          </Select>
        </FormControl>
    );
  }
}

SimpleSelect.propTypes = {
  classes: PropTypes.object.isRequired,
  name: PropTypes.string.isRequired,
};

export default withStyles(styles)(SimpleSelect);

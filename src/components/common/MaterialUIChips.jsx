import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'material-ui/styles/withStyles';
import Avatar from 'material-ui/Avatar';
import Chip from 'material-ui/Chip';
import Paper from 'material-ui/Paper';
import TagFacesIcon from 'material-ui-icons/TagFaces';
import { RingLoader } from 'react-spinners';
import Dialog from 'material-ui/Dialog/Dialog';
import DialogActions from 'material-ui/Dialog/DialogActions';
import DialogContent from 'material-ui/Dialog/DialogContent';
import DialogContentText from 'material-ui/Dialog/DialogContentText';
import DialogTitle from 'material-ui/Dialog/DialogTitle';
import Modal from 'react-bootstrap/lib/Modal';
import { SaveButtonV1 } from '../../components/common/SaveButton.jsx';

import Slide from 'material-ui/transitions/Slide';
import Button from 'material-ui/Button';


function Transition(props) {
  return <Slide direction="up" {...props} />;
}

const styles = theme => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap',
    padding: theme.spacing.unit / 2,
  },
  chip: {
    margin: theme.spacing.unit / 2,
  },
});

class ChipsArray extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      chipData: props.chipData,
      open: false,
    };
  }

  handleClickOpen = (data) => {
    this.data = data;
    this.setState({ open: true });
  };

  handleCloseWithNo = () => {
    this.setState({ open: false });
  };

  handleCloseWithYes = () => {
    const unAssignOrgUrl = `${this.props.unAssignOrgUrl}?organisation=${this.data.key}`;
    this.props.handleUnAssignOrg(unAssignOrgUrl);

    this.setState({ open: false });
    const chipData = [...this.state.chipData];
    const chipToDelete = chipData.indexOf(this.data);
    chipData.splice(chipToDelete, 1);
    this.setState({ chipData });
  };


  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        {this.state.chipData.map((data) => {
          const avatar = null;
          if (this.state.chipData.length == 1) {
            return (
              <Chip
                key={data.key}
                avatar={avatar}
                label={data.label}
                className={classes.chip}
                style={{ fontSize: '14px' }}
              />
            );
          }
            return (
              <div>
                <Chip
                  key={data.key}
                  avatar={avatar}
                  label={data.label}
                  onDelete={() => this.handleClickOpen(data)}
                  className={classes.chip}
                  style={{ fontSize: '14px' }}
                />
                <Modal show={this.state.open} onHide={this.handleCloseWithNo}>
                  <Modal.Header closeButton>
                    <Modal.Title>"Unassign a organization ?"</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    <div> {'Do you really want to unassign this organization?'} </div>
                  </Modal.Body>
                  <Modal.Footer>
                    <SaveButtonV1
                      btnText="Yes"
                      children=' '
                      insertSpaceAfterIcon={true}
                      btnClassName="btn btn-info"
                      onClickHandler={this.handleCloseWithYes} />
                  </Modal.Footer>
                </Modal>
              </div>
            );
        })}

      </div>
    );
  }
}


ChipsArray.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ChipsArray);


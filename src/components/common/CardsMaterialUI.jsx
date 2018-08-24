import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'material-ui/styles/withStyles';
import Card from 'material-ui/Card/Card';
import CardContent from 'material-ui/Card/CardContent';
import Button from 'material-ui/Button';
import Typography from 'material-ui/Typography';
import Chip from '../../components/common/ChipMaterialUI.jsx';

const styles = theme => ({
  card: {
    width: '120vh',
    position: 'relative',
    top: '-7vh',
    transitions: '3',
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    marginBottom: 16,
    fontSize: 14,
    color: theme.palette.text.secondary,
  },
  pos: {
    marginBottom: 12,
    color: theme.palette.text.secondary,
  },
});

function SimpleCard(props) {
  const { classes } = props;
  const bull = <span className={classes.bullet}>•</span>;


  return (
    <div>
      <Card className={classes.card}>
        <CardContent>
          <Typography className={classes.title} variant="title" gutterBottom><Chip> </Chip></Typography>
        </CardContent>
      </Card>
    </div>
  );
}

SimpleCard.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SimpleCard);

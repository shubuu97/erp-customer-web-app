import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import withStyles from 'material-ui/styles/withStyles';
import Table from 'material-ui/Table/Table';
import TableBody from 'material-ui/Table/TableBody';
import TableCell from 'material-ui/Table/TableCell';
import TableFooter from 'material-ui/Table/TableFooter';
import TableHead from 'material-ui/Table/TableHead';
import TablePagination from 'material-ui/Table/TablePagination';
import TableRow from 'material-ui/Table/TableRow';
import TableSortLabel from 'material-ui/Table/TableSortLabel';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import Paper from 'material-ui/Paper';
import IconButton from 'material-ui/IconButton';
import Tooltip from 'material-ui/Tooltip';
import DeleteIcon from 'material-ui-icons/Delete';
import FilterListIcon from 'material-ui-icons/FilterList';
import { lighten } from 'material-ui/styles/colorManipulator';
import Grid from 'material-ui/Grid';
import ReactJson from 'react-json-view';

let counter = 0;
function createData(blockHash, previousHash, transactionId, timeStamp, data) {
  counter += 1;
  return {
    id: counter, blockHash, previousHash, transactionId, timeStamp, data,
  };
}

const columnData = [
  {
    id: 'blockHash', numeric: false, disablePadding: false, label: 'Block#',
  },
  {
    id: 'previousHash', numeric: false, disablePadding: false, label: 'Previous Hash',
  },
  {
    id: 'currentHash', numeric: false, disablePadding: false, label: 'Current Hash',
  },
  { id: 'transactionId', disablePadding: false, label: 'Transaction Id' },
  { id: 'timeStamp', disablePadding: false, label: 'Timestamp' },
  { id: 'data', disablePadding: false, label: 'Data' },
];

class EnhancedTableHead extends React.Component {
  createSortHandler = property => (event) => {
    this.props.onRequestSort(event, property);
  };

  render() {
    const {
      onSelectAllClick, order, orderBy, numSelected, rowCount,
    } = this.props;

    return (
      <TableHead>
         <TableRow>

          {columnData.map(column => (
              <TableCell
                key={column.id}
                numeric={column.numeric}
                padding={column.disablePadding ? 'none' : 'default'}
                sortDirection={orderBy === column.id ? order : false}
              >
                <Tooltip
                  title="Sort"
                  placement={column.numeric ? 'bottom-end' : 'bottom-start'}
                  enterDelay={300}
                >
                  <TableSortLabel
                    active={orderBy === column.id}
                    direction={order}
                    onClick={this.createSortHandler(column.id)}
                  >
                    {column.label}
                  </TableSortLabel>
                </Tooltip>
              </TableCell>
            ), this)}
        </TableRow>
      </TableHead>
    );
  }
}

EnhancedTableHead.propTypes = {
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.string.isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

const toolbarStyles = theme => ({
  root: {
    paddingRight: theme.spacing.unit,
  },
  highlight:
    theme.palette.type === 'light'
      ? {
        color: theme.palette.secondary.dark,
        backgroundColor: lighten(theme.palette.secondary.light, 0.4),
      }
      : {
        color: lighten(theme.palette.secondary.light, 0.4),
        backgroundColor: theme.palette.secondary.dark,
      },
  spacer: {
    flex: '1 1 100%',
  },
  actions: {
    color: theme.palette.text.secondary,
  },
  title: {
    flex: '0 0 auto',
  },
});

let EnhancedTableToolbar = (props) => {
  const { numSelected, classes } = props;

  return (
    <Toolbar
      className={classNames(classes.root, {
        [classes.highlight]: numSelected > 0,
      })}
    >
      <div className={classes.title}>
        {numSelected > 0 ? (
          <Typography variant="subheading">{numSelected} selected</Typography>
        ) : (
          <Typography variant="title">Blockchain History</Typography>
        )}
      </div>
      <div className={classes.spacer} />
      <div className={classes.actions}>
        {numSelected > 0 ? (
          <Tooltip title="Delete">
            <IconButton aria-label="Delete">
              <DeleteIcon />
            </IconButton>
          </Tooltip>
        ) : (
          <Tooltip title="Filter list">
            <IconButton aria-label="Filter list">
              <FilterListIcon />
            </IconButton>
          </Tooltip>
        )}
      </div>
    </Toolbar>
  );
};

EnhancedTableToolbar.propTypes = {
  classes: PropTypes.object.isRequired,
  numSelected: PropTypes.number.isRequired,
};

EnhancedTableToolbar = withStyles(toolbarStyles)(EnhancedTableToolbar);

const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
  },
  table: {
    minWidth: 1000,
  },
  tableWrapper: {
    overflowX: 'auto',
  },
});

class EnhancedTable extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      order: 'asc',
      orderBy: 'code',
      selected: [],
      data: props.Blocks.sort((a, b) => (a.blockHash < b.blockHash ? -1 : 1)),
      page: 0,
      rowsPerPage: 8,
    };
  }

  handleRequestSort = (event, property) => {
    const orderBy = property;
    let order = 'desc';

    if (this.state.orderBy === property && this.state.order === 'desc') {
      order = 'asc';
    }

    const data =
      order === 'desc'
        ? this.state.data.sort((a, b) => (b[orderBy] < a[orderBy] ? -1 : 1))
        : this.state.data.sort((a, b) => (a[orderBy] < b[orderBy] ? -1 : 1));

    this.setState({ data, order, orderBy });
  };

  // handleSelectAllClick = (event, checked) => {
  //   if (checked) {
  //     this.setState({ selected: this.state.data.map(n => n.id) });
  //     return;
  //   }
  //   this.setState({ selected: [] });
  // };

  handleClick = (event, id) => {
    const { selected } = this.state;
    const selectedIndex = selected.indexOf(id);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
    }

    this.setState({ selected: newSelected });
  };

  handleChangePage = (event, page) => {
    this.setState({ page });
  };

  handleChangeRowsPerPage = (event) => {
    this.setState({ rowsPerPage: event.target.value });
  };

  isSelected = id => this.state.selected.indexOf(id) !== -1;

  render() {
    const { classes } = this.props;
    const {
      data, order, orderBy, selected, rowsPerPage, page,
    } = this.state;
    const emptyRows = rowsPerPage - Math.min(rowsPerPage, data.length - page * rowsPerPage);

    return (

      <Paper className={classes.root}>
        <EnhancedTableToolbar numSelected={selected.length} />
        <div className={classes.tableWrapper}>
          <Table className={classes.table} style={ { tableLayout: 'fixed' } }>
            <EnhancedTableHead
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={this.handleSelectAllClick}
              onRequestSort={this.handleRequestSort}
              rowCount={data.length}
            />
            <TableBody>
              {data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((n) => {
                const isSelected = this.isSelected(n.id);
                return (
                  <TableRow
                    hover
                    onClick={event => this.handleClick(event, n.id)}
                    // role="checkbox"
                    aria-checked={isSelected}
                    tabIndex={-1}
                    key={n.id}
                    selected={isSelected}
                  >
                    {/* <TableCell padding="checkbox">
                      <Checkbox checked={isSelected} />
                    </TableCell> */}
                    <TableCell style={{ whiteSpace: 'normal', wordWrap: 'break-word' }} padding="default">{n.blockNumber}</TableCell>
                    <TableCell style={{ whiteSpace: 'normal', wordWrap: 'break-word' }} padding="default">{n.previousHash}</TableCell>
                    <TableCell style={{ whiteSpace: 'normal', wordWrap: 'break-word' }} padding="default">{n.currentHash}</TableCell>
                    <TableCell style={{ whiteSpace: 'normal', wordWrap: 'break-word' }} padding="default">{n.txId}</TableCell>
                    <TableCell style={{ whiteSpace: 'normal', wordWrap: 'break-word' }} padding="default">{n.timeStamp}</TableCell>
                    <TableCell style={{ whiteSpace: 'normal', wordWrap: 'break-word' }} numeric>
                      <ReactJson
                        src={n.Stats.value}
                        name={null}
                        iconStyle="square"
                        indentWidth={2}
                        collapsed={1}
                        collapseStringsAfterLength={true}
                        enableClipboard={false}
                        displayObjectSize={false}
                        displayDataTypes={false} />
                    </TableCell>

                  </TableRow>
                );
              })}
              {emptyRows > 0 && (
                <TableRow style={{ height: 49 * emptyRows }}>
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
            <TableFooter>
              <TableRow>
                <TablePagination
                  colSpan={6}
                  count={data.length}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  backIconButtonProps={{
                    'aria-label': 'Previous Page',
                  }}
                  nextIconButtonProps={{
                    'aria-label': 'Next Page',
                  }}
                  onChangePage={this.handleChangePage}
                  onChangeRowsPerPage={this.handleChangeRowsPerPage}
                />
              </TableRow>
            </TableFooter>
          </Table>
        </div>
      </Paper>
    );
  }
}

EnhancedTable.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(EnhancedTable);

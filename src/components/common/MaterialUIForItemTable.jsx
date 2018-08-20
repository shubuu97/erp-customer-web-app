
import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import withStyles from 'material-ui/styles/withStyles';
import Avatar from 'material-ui/Avatar';
import Chip from 'material-ui/Chip';
import TagFacesIcon from 'material-ui-icons/TagFaces';
import _get from 'lodash/get';
import _map from 'lodash/map';
import _isEmpty from 'lodash/isEmpty';
import _find from 'lodash/find';
import _pickBy from 'lodash/pickBy';
import { RingLoader } from 'react-spinners';

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
import Checkbox from 'material-ui/Checkbox';
import IconButton from 'material-ui/IconButton';
import Tooltip from 'material-ui/Tooltip';
import DeleteIcon from 'material-ui-icons/Delete';
import FilterListIcon from 'material-ui-icons/FilterList';
import { lighten } from 'material-ui/styles/colorManipulator';
import Button from 'material-ui/Button';
import ChipsArray from '../../components/common/MaterialUIChips.jsx';


const columnData = [
  {
    id: 'itemNo', numeric: false, disablePadding: false, label: 'Item No',
  },
  {
    id: 'itemType', numeric: false, disablePadding: false, label: 'Item Type',
  },
  {
    id: 'itemDescription', numeric: false, disablePadding: false, label: 'Item Desc',
  },
  {
    id: 'orgNames', numeric: false, disablePadding: false, label: 'Org Names',
  },
  { id: 'blockChainHistoryBtn', disablePadding: false, label: 'Blockchain History' },
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
                    {<TableCell padding="checkbox">
                        <Checkbox
                            indeterminate={numSelected > 0 && numSelected < rowCount}
                            checked={numSelected === rowCount}
                            onChange={onSelectAllClick}
                            style={{ color: '#0085a1' }}
                        />
                    </TableCell>}
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
        //   className={classNames(classes.root, {
        //     [classes.highlight]: numSelected > 0,
        //   })}
        >
            <div className="col-01">
                <div className={classes.title}>
                    <Typography variant="title">Item Table  </Typography>
                    {numSelected > 0 ? (
                        <Typography variant="subheading">{numSelected} selected</Typography>
                    ) : ''
                    }
                </div>
            </div>
            {/* <div className={classes.spacer} /> */}
            {/* <div className={classes.actions}>
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
      </div> */}
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
    minWidth: 800,
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
      orderBy: 'calories',
      selected: [],
      data: this.props.itemRows.itemResults.sort((a, b) => (a.itemNo < b.itemNo ? -1 : 1)),
      page: 0,
      rowsPerPage: 5,
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

    handleSelectAllClick = (event, checked) => {
      if (checked) {
        this.setState({ selected: this.state.data.map(n => n.itemId) }, () => {
          this.props.handleAssignOrg(this.state.selected);
        });

        return;
      }
      this.setState({ selected: [] });
    };

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

      this.setState({ selected: newSelected }, () => {
        this.props.handleAssignOrg(this.state.selected);
      });
    };

    handleChangePage = (event, page) => {
      this.setState({ page });
    };

    handleChangeRowsPerPage = (event) => {
      this.setState({ rowsPerPage: event.target.value });
    };

    isSelected = id => this.state.selected.indexOf(id) !== -1;


    handleItemClick(url) {
      this.props.handleItemClick(url);
    }

    handleBlockchainHistoryClick(url) {
      this.props.handleBlockchainHistoryClick(url);
    }


    getOrganisationDisplayText(organisationsLookUpData, organisationData) {
      let orgObject = [];
      let orgs = [];


      if (_isEmpty(organisationData)) {
        return orgs;
      }

      orgObject = _map(organisationData, org => _find(organisationsLookUpData.data, { value: org }));
      orgObject = _pickBy(orgObject);

      orgs = _map(orgObject, org => ({ key: org.value, label: org.displayText }));

      return orgs;
    }

    handleUnAssignOrg = (unAssignOrgUrl) => {
      this.props.handleUnAssignOrg(unAssignOrgUrl);
    }


    render() {
      if (_get(this, 'props.isFetching')) {
        return (<div className='loader-wrapper'>
                <RingLoader color={'#50E3C2'} loading={_get(this, 'props.isFetching')} />
            </div>);
      }


      const {
        classes, suppliers, onSupplierLinkClick, onViewHistoryBtnClick,
      } = this.props;
      const data = this.props.itemRows.itemResults;

      const {
        order, orderBy, selected, rowsPerPage, page,
      } = this.state;
      const emptyRows = rowsPerPage - Math.min(rowsPerPage, data.length - page * rowsPerPage);

      const organisationsLookUp = this.props.itemRows && this.props.itemRows.organisations;

      return (
            <Paper className={classes.root}>
                <EnhancedTableToolbar numSelected={selected.length} />
                <div className={classes.tableWrapper}>
                    <Table className={`${classes.table} table-bordered table-custom`}>
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
                                const isSelected = this.isSelected(n.itemId);
                                return (
                                    <TableRow
                                        hover
                                        onClick={event => this.handleClick(event, n.itemId)}
                                        role="checkbox"
                                        aria-checked={isSelected}
                                        tabIndex={-1}
                                        key={n.itemId}
                                        selected={isSelected}
                                    >
                                        <TableCell padding="checkbox">
                                            <Checkbox checked={isSelected} style={{ color: '#0085a1' }} />
                                        </TableCell>
                                        <TableCell >
                                            <a onClick={this.handleItemClick.bind(this, n._links.viewItem.href)}>{n.itemNo}</a>
                                        </TableCell>
                                        <TableCell numeric>{n.itemType}</TableCell>
                                        <TableCell numeric>{n.itemDesc}</TableCell>
                                        <TableCell numeric>
                                            {
                                                _isEmpty(this.getOrganisationDisplayText(organisationsLookUp, n.organisations)) ?
                                                    ''
                                                    : <ChipsArray
                                                        chipData={this.getOrganisationDisplayText(organisationsLookUp, n.organisations)}
                                                        unAssignOrgUrl={n._links.unAssignOrganization.href}
                                                        handleUnAssignOrg={(unAssignOrgUrl) => { this.handleUnAssignOrg(unAssignOrgUrl); }}
                                                    />
                                            }
                                        </TableCell>
                                        <TableCell numeric><Button className="btn btn-info btn-sm" onClick={this.handleBlockchainHistoryClick.bind(this, n._links.blockChainHistory.href)}>View</Button></TableCell>
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
